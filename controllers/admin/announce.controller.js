const announce = require("../../models/announce.js");
const catalogs = require("../../models/catalogs.js");

exports.index = async (req, res) => {
  let result = await announce.find({});
  res.json({ results: result });
};

exports.create = async (req, res) => {
  const result = await catalogs.find();
  res.json({ results: result });
};

exports.edit = async (req, res) => {
  const result = await announce.findOne({ _id: req.params.id });
  const catalog = await catalogs.find();
  res.json({ results: result, catalog: catalog });
};

exports.store = async (req, res) => {
  const logo = req.file == undefined ? "" : `${req.file.location}`;
  req.body.img = logo;
  await announce.create(req.body);
  res.json({ status: true });
};

exports.delete = async (req, res) => {
  await announce.findOne({ _id: req.params.id }).remove();
  res.json({ status: true });
};

exports.update = async (req, res) => {
  const logo =
    req.file == undefined ? req.body.imgBefore : `${req.file.location}`;
  req.body.img = logo;
  await announce.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.json({ status: true });
};
