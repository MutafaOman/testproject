var product = require("../../models/products.js");
var catalogs = require("../../models/catalogs.js");

exports.index = async (req, res) => {
  let $rex = new RegExp(req.body.text, "g");
  const perPage = req.body.setPage;
  const page = req.body.page;
  const active = req.body.active;
  const result = await getProduct($rex, perPage, page, active);
  const catalog = await catalogs.find().sort({ order: 1 });
  res.json({
    results: result.result,
    catalog: catalog,
    active: req.body.active,
    count: Math.ceil(result.count / perPage),
  });
};

async function getProduct($rex, perPage, page, active) {
  if (active == "All") {
    const result = await product
      .find({ name: $rex })
      .sort({ order: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await product.find({ name: $rex }).count();
    return {
      result: result,
      count: count,
    };
  } else {
    const catalogfind = await catalogs.findOne({ name: active });
    const result = await product
      .find({ name: $rex, catalog_id: catalogfind._id })
      .sort({ order: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await product
      .find({ name: $rex, catalog_id: catalogfind._id })
      .count();
    return {
      result: result,
      count: count,
    };
  }
}

exports.create = async (req, res) => {
  const catalog = await catalogs.find({});
  res.json({ catalogs: catalog });
};

exports.edit = async (req, res) => {
  const result = await product.findOne({ _id: req.params.id });
  const catalog = await catalogs.find({});
  res.json({
    result: result,
    catalogs: catalog,
  });
};

exports.store = async (req, res) => {
  const logo = req.files.img == undefined ? "" : `${req.files.img[0].location}`;
  const logo_detail =
    req.files.img_detail == undefined
      ? ""
      : req.files.img_detail.map(function (e, i) {
          return e.location;
        });
  const logo_color =
    req.files.img_color == undefined
      ? ""
      : req.files.img_color.map(function (e, i) {
          return e.location;
        });
  req.body.img = logo;
  req.body.img_detail = logo_detail;
  req.body.img_color = logo_color;
  await product.create(req.body);
  res.json({ status: true });
};

exports.update = async (req, res) => {
  const logo =
    req.files.img == undefined
      ? req.body.before
      : `${req.files.img[0].location}`;
  const logo_detail =
    req.files.img_detail == undefined ? "" : req.files.img_detail;
  const img_details = await product.findOne({ _id: req.params.id });
  let newImage = img_details.img_detail;
  if (logo_detail != "") {
    logo_detail.map(function (e, i) {
      newImage.push(e.location);
    });
  }
  req.body.img = logo;
  req.body.img_detail = newImage;
  let result = await product.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.redirect("/products");
};

exports.deleted = async (req, res) => {
  await product.deleteMany({ _id: req.body.id });
  res.json("success");
};

exports.removeImg_detail = async (req, res) => {
  let d = req.body;
  const findImage = await product.findOne({ _id: d.id });
  let array = findImage.img_detail;
  array.forEach(function (element, index) {
    if (d.index == index) {
      array.splice(index, 1);
    }
  });
  await product.updateMany({ _id: d.id }, { $set: { img_detail: array } });
  res.json("success");
};

exports.productmodals = async (req, res) => {
  const catalog = await catalogs.findOne({ name: req.body.name });
  const products = await product
    .find({ catalog_id: catalog._id })
    .sort({ order: 1 });
  res.json(products);
};

exports.setfavorate = async (req, res) => {
  let data = req.body;
  for (let i = 0; i < data["data[]"].length; i++) {
    await product.update(
      {
        _id: data["data[]"][i],
      },
      {
        $set: {
          order: i + 1,
        },
      }
    );
  }
  res.json({ success: "success" });
};

exports.deletedImage = async (req, res) => {
  const d = req.body;
  const result = await product.findOne({ _id: d._id });
  if (d.type === "img_detail") {
    const index = result.img_detail.findIndex((m) => m === d.name);
    result.img_detail.splice(index, 1);
    await product.updateOne(
      { _id: d._id },
      { $set: { img_detail: result.img_detail } }
    );
  } else {
    const index = result.img_color.findIndex((m) => m === d.name);
    result.img_color.splice(index, 1);
    await product.updateOne(
      { _id: d._id },
      { $set: { img_color: result.img_color } }
    );
  }
  res.json({ success: "success" });
};

exports.setting = async (req, res) => {
  const d = req.body;
  await product.updateOne({ _id: req.params.id }, { $set: { show: d.show } });
  res.json({ success: "success" });
};
