const catalogs = require("../../models/catalogs.js");

exports.index = async (req, res) => {
  const result = await catalogs.aggregate([
    {
      $lookup: {
        from: "product_rewards",
        localField: "_id",
        foreignField: "catalog_id",
        as: "products",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        count: { $size: "$products" },
      },
    },
  ]);
  res.json({ results: result });
};

exports.edit = async (req, res) => {
  const result = await catalogs.findOne({ _id: req.params.id });
  res.json({ results: result });
};

exports.store = async (req, res) => {
  const ct = await catalogs.find({}).sort({ order: -1 }).limit(1);
  req.body.order = ct[0].order + 1;
  await catalogs.create(req.body);
  res.json({ status: true });
};

exports.update = async (req, res) => {
  await catalogs.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.json({ status: true });
};
