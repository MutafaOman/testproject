const AdminController = require("../controllers/admin/admin.controllers");
const dashboard = require("../controllers/admin/dashboard.controller");
const banner = require("../controllers/admin/banner.controller");
const announce = require("../controllers/admin/announce.controller");
const catalog = require("../controllers/admin/catalog.controller");
const porduct = require("../controllers/admin/product.controller");
const order = require("../controllers/admin/order.controller");

var multer = require("multer");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");
aws.config.update({
  region: "ap-southeast-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
var s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hireward-files",
    acl: "public-read",
    cacheControl: "max-age=31536000",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});
var cpUpload = upload.fields([
  { name: "img", maxCount: 1 },
  { name: "img_detail", maxCount: 8 },
  { name: "img_color", maxCount: 8 },
]);

module.exports = function (app, passport) {
  app.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });

  app.post("/admin/login", AdminController.login);
  app.post("/admin/dashboard", dashboard.dashboards);

  app.post("/admin/banners", banner.index);
  app.post("/admin/banner/create", banner.create);
  app.post("/admin/banner/save", upload.single("img"), banner.store);
  app.post("/admin/banner/:id/edit", banner.edit);
  app.post("/admin/banner/:id/update", upload.single("img"), banner.update);
  app.post("/admin/banner/:id/delete", banner.delete);

  app.post("/admin/announce", announce.index);
  app.post("/admin/announce/create", announce.create);
  app.post("/admin/announce/save", upload.single("img"), announce.store);
  app.post("/admin/announce/:id/delete", announce.delete);
  app.post("/admin/announce/:id/edit", announce.edit);
  app.post("/admin/announce/:id/update", announce.update);

  app.post("/admin/catalog", catalog.index);
  app.post("/admin/catalog/create", catalog.store);
  app.post("/admin/catalog/:id/edit", catalog.edit);
  app.post("/admin/catalog/:id/update", catalog.update);

  app.post("/admin/product", porduct.index);
  app.post("/admin/product/create", porduct.create);
  app.post("/admin/product/save", cpUpload, porduct.store);
  app.post("/admin/product/:id/edit", porduct.edit);
  app.post("/admin/product/image/delete", porduct.deletedImage);
  app.post("/admin/product/show/:id", porduct.setting);

  app.post("/admin/orders", order.index);
};
