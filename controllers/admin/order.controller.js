var order = require("../../models/order.js");
// var product = require('../models/products.js')
var mongoose = require("mongoose");
const groupUserModel = require("../../models/groupuser");
const coreFunction = require("../coreFunction");
const userModel = require("../../models/user.js");

exports.index = async (req, res) => {
  const datetime = await coreFunction.checkStartEndDateBody(req);
  const $rex = new RegExp(req.body.text, "g");
  const perPage = req.body.setPage;
  const page = req.body.page;
  const result = await order
    .aggregate([
      {
        $match: { status: { $ne: 3 }, reject: { $ne: true } },
        $match: {
          createdAt: {
            $gte: datetime.start,
            $lte: datetime.end,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: { "user.username": $rex },
      },
      { $sort: { createdAt: -1 } },
    ])
    .skip(perPage * page - perPage)
    .limit(perPage);
  const count = await order.aggregate([
    {
      $match: { status: { $ne: 3 }, reject: { $ne: true } },
      $match: {
        createdAt: {
          $gte: datetime.start,
          $lte: datetime.end,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },

    {
      $match: { "user.username": $rex },
    },
    { $sort: { createdAt: -1 } },
  ]);
  res.json({
    results: result,
    start: datetime.start,
    end: datetime.end,
    count: Math.ceil(count.length / perPage),
  });
};

exports.edit = async (req, res) => {
  const groups = await groupUserModel.find({});
  let result = await order.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    { $sort: { createdAt: -1 } },
  ]);
  res.render("backend/sales/order-edit", {
    results: result[0],
    orders: result[0].order,
    groups: groups,
  });
};

exports.update = async (req, res) => {
  // res.json({data: req.body })
  let orderDetail = await order.findOne({ _id: req.params.id });
  let user = await userModel.findOne({ _id: orderDetail.user_id });
  req.body.user = user;
  await order.update(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    {
      $set: req.body,
    }
  );

  let orderList = await order.findOne({ _id: req.params.id });
  if (req.body.status === 2 && orderList.status !== req.body.status) {
    let request = orderList.order;
    let totalPoint = 0;
    for (var i = request.length - 1; i >= 0; i--) {
      totalPoint += request[i].point;
    }
    let updatePoint = parseFloat(orderDetail.point) - parseFloat(totalPoint);
    let calpoint = user.point + updatePoint;
    await userModel.updateOne(
      {
        _id: orderDetail.user_id,
      },
      {
        $set: {
          point: calpoint,
        },
      }
    );
  }

  if (req.body.status === 0 && orderList.status !== req.body.status) {
    let request = orderList.order;
    for (var i = request.length - 1; i >= 0; i--) {
      let orderId = request[i].product_id;
      let amount = request[i].amount;
      let result = await productModel.findOne({ _id: orderId });
      await productModel.update(
        {
          _id: orderId,
        },
        {
          $set: {
            cost: result.cost + amount,
          },
        }
      );
    }
  } else if (req.body.status === -1 && orderList.status !== req.body.status) {
    let request = orderList.order;
    for (var i = request.length - 1; i >= 0; i--) {
      let orderId = request[i].product_id;
      let amount = request[i].amount;
      let result = await productModel.findOne({ _id: orderId });
      await productModel.update(
        {
          _id: orderId,
        },
        {
          $set: {
            cost: result.cost - amount,
          },
        }
      );
    }
  }
  res.redirect("/orders");
};

exports.orderDelivery = async (req, res) => {
  let datetime = await coreFunction.checkStartEndDateBody(req);
  let result = await order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: datetime.start,
          $lte: datetime.end,
        },
      },
      $match: { status: 3 },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    { $sort: { createdAt: -1 } },
  ]);
  res.render("backend/sales/order_delivery", {
    results: result,
    start: datetime.start,
    end: datetime.end,
  });
};

exports.reject = async (req, res) => {
  await order.findOne({ order_id: req.body.order_id }, async (err, d) => {
    if (d) {
      await order.updateMany(
        { order_id: req.body.order_id },
        { $set: { reject: true } }
      );
      const user = await userModel.findOne({ _id: d.user_id });
      await userModel.updateMany(
        { _id: user._id },
        { $set: { point: user.point + d.point } }
      );
    }
  });
  res.json("success");
};

exports.orderReject = async (req, res) => {
  let datetime = await coreFunction.checkStartEndDateBody(req);
  let result = await order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: datetime.start,
          $lte: datetime.end,
        },
      },
      $match: { reject: true },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    { $sort: { createdAt: -1 } },
  ]);
  // res.json(result)
  res.render("backend/sales/order_reject", {
    results: result,
    start: datetime.start,
    end: datetime.end,
  });
};
