var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var modelSchema = new Schema(
  {
    name: String,
    img: String,
    order: Number,
    section: Number,
    page: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banners", modelSchema);
