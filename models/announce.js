var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var modelSchema = new Schema(
  {
    name: String,
    description: String,
    order: Number,
    section: Number,
    page: Array,
    catalog: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("announces", modelSchema);
