const AdminController = require("../controllers/admin/admin.controllers")

var multer = require('multer')
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
aws.config.update({
  'region': 'ap-southeast-1',
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY
});
var s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hi-reward-static-files',
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});
var cpUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img_detail', maxCount: 8 }])

module.exports = function (app, passport) {
  app.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.post('/admin/login', AdminController.login);

}
