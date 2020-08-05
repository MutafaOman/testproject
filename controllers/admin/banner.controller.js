const banners = require("../../models/banners.js");
const catalogs = require("../../models/catalogs.js");

exports.index = async (req, res) => {
  const result = await banners.find({}).sort({ order: 1 });
  res.json({ results: result });
};

exports.create = async (req, res) => {
  const catalog = await catalogs.find({});
  res.json({ results: catalog });
};

exports.edit = async (req, res) => {
  const result = await banners.findOne({ _id: req.params.id });
  res.json({ results: result });
};

exports.delete = async (req, res) => {
  await banners.findOne({ _id: req.params.id }).remove();
  res.json({ status: true });
};

exports.store = async (req, res) => {
  const logo = req.file == undefined ? "" : `${req.file.location}`;
  req.body.img = logo;
  await banners.create(req.body);
  res.json({ status: true });
};

exports.update = async (req, res) => {
  const logo =
    req.file == undefined ? req.body.imgBefore : `${req.file.location}`;
  req.body.img = logo;
  await banners.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.json({ status: true });
};
