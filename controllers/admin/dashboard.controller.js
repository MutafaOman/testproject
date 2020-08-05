const order = require("../../models/order.js");
const user = require("../../models/user.js");

exports.dashboards = async (req, res) => {
  let result = await order
    .aggregate([
      {
        $match: {
          status: 0
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      { $sort: { createdAt: -1 } }
    ])
    .limit(10);
  const orderfind = await order.find({}).count();
  const userfind = await user.find({}).count();
  const pendingfind = await order.find({ status: 0 }).count();
  const processingfind = await order.find({ status: 1 }).count();
  const shippedfind = await order.find({ status: 2 }).count();

  let userCount = kFormatter(userfind);
  let orderCount = kFormatter(orderfind);
  let pending = kFormatter(pendingfind);
  let processing = kFormatter(processingfind);
  let shipped = kFormatter(shippedfind);

  res.json({
    results: result,
    orderCount: orderCount,
    userCount: userCount,
    pending: pending,
    processing: processing,
    shipped: shipped
  })
};

function kFormatter(num) {
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
}
