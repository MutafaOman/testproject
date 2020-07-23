var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = mongoose.Schema({
      name: { type: String, index: true },
  fullName: { type: String, index: true ,default: ''},
  username: { type: String},
  email: { type: String },
  nameAccount: { type: String, index: true },
  credit: { type: Number ,default:0 },
  role: { type: String },
  password: String,
  status: { type: String, default: "pending" },
  permission: Number,
  lastLogin: Date,
  active_hash: String,
  gen: { type: String ,default:"New"},
  pin0: Number,
  pin1: Number,
  pin2: Number,
  pin3: Number,
  phone: { type: String},
  line: { type: String, index: true },
  birthday: { type: Date },
  point: { type: Number, default: 0 },
  agentCode: { type: String ,default: "" },
  remark: { type: String },
  ownerWeb: { type: Boolean, default: false },
  wechat: { type: String, index: true },
  whatsapp: { type: String, index: true },
  description: String,
  numOfdeposit: { type: Number, default: 0 },
  numOfwithdraw: { type: Number, default: 0 },
  sumOfdeposit: { type: Number, default: 0 },
  sumOfwithdraw: { type: Number, default: 0 },
  sumOfBonus: { type: Number, default: 0 },
  agentLevel: { type: Number },
  ip: String,
  bankName: { type: String },
  bankAccount: { type: String },
  bankNameAccount: { type: String },
  bankColor: { type: String },
  bankImg: { type: String },
  userAgent: {},
  verified: { type: Boolean, default: false},
  authyId: String,
  agShare: {type:Number,defailt:0},
  agCreate: {type:Boolean,defailt:false},
  bankId: mongoose.Schema.Types.ObjectId,
  webAccess: [{
    comm_status: { type: Boolean, default: false },
    access_status: { type: Boolean, default: false },
    webname: String,
    username: String,
    userMobile: String,
    password: String,
    web:{
        name : String,
        img : String,
        link : String,
        userImg : String,
        liveapi: { type: Boolean, default: false },
        path: { type: String, default: "" },
        download: { type: String, default: "" },
    },
    webId: { type: mongoose.Schema.Types.ObjectId, ref: 'webs' },
    balance: { type: Number, default: 0 },
    promotion: []
  }],
  permission:{
    Home:{
      Dashboard:{access:{type:Boolean,default:false}},
      SummaryBoard:{access:{type:Boolean,default:false}},
      Announcement:{access:{type:Boolean,default:false}},
    },
    Status:{
      StatusServer:{access:{type:Boolean,default:false}},
      StatusBot:{access:{type:Boolean,default:false}},
      StatusMiniGame:{access:{type:Boolean,default:false}},
    },
    MemberManagment:{
      Member:{access:{type:Boolean,default:false}},
      Admin:{access:{type:Boolean,default:false}},
      Agent:{access:{type:Boolean,default:false}},
      Master:{access:{type:Boolean,default:false}},
      Group:{access:{type:Boolean,default:false}},
      Blacklist:{access:{type:Boolean,default:false}},
      UserStock:{access:{type:Boolean,default:false}},
    },
    CashSystem:{
      DepositWallet:{access:{type:Boolean,default:false}},
      WithdrawWallet:{access:{type:Boolean,default:false}},
      TransferIn:{access:{type:Boolean,default:false}},
      TransferOut:{access:{type:Boolean,default:false}},
      Transactionbystaff:{access:{type:Boolean,default:false}},
      ShiftActive:{access:{type:Boolean,default:false}},
      DWBankSetting:{access:{type:Boolean,default:false}},
      LogTransection:{access:{type:Boolean,default:false}},
    },
    Report:{
      ShiftReport:{access:{type:Boolean,default:false}},
      BankDeposit:{access:{type:Boolean,default:false}},
      BankWithdraw:{access:{type:Boolean,default:false}},
      TransferInReport:{access:{type:Boolean,default:false}},
      TransferOutReport:{access:{type:Boolean,default:false}},
      WebReport:{access:{type:Boolean,default:false}},
      MemberReport:{access:{type:Boolean,default:false}},
      AffiliateReport:{access:{type:Boolean,default:false}},
      PromotionReport:{access:{type:Boolean,default:false}},
      BalanceReport:{access:{type:Boolean,default:false}},
      Activity:{access:{type:Boolean,default:false}},
    },
    Promotion:{
      BonusSetting:{access:{type:Boolean,default:false}},
      PointRewardSetting:{access:{type:Boolean,default:false}},
      NewRegisterBonus:{access:{type:Boolean,default:false}},
      TopupPoint:{access:{type:Boolean,default:false}},
    },
    WebsiteEditor:{
      ProviderSetting:{access:{type:Boolean,default:false}},
      ShiftSettng:{access:{type:Boolean,default:false}},
      LanguageSetting:{access:{type:Boolean,default:false}},
      CommissionPlan:{access:{type:Boolean,default:false}},
      WebsiteEditor:{access:{type:Boolean,default:false}},
      Downloads:{access:{type:Boolean,default:false}},
    },
    Option:{
      VerifyWallet:{access:{type:Boolean,default:false}},
      ApproveWallet:{access:{type:Boolean,default:false}},
      Member:{access:{type:Boolean,default:true},read:{type:Boolean,default:false},edit:{type:Boolean,default:false}},
      Agent:{access:{type:Boolean,default:true},read:{type:Boolean,default:false},edit:{type:Boolean,default:false}},
      ShiiftAction:{access:{type:Boolean,default:false}},
    }
  },
  share:[],
    address: String,
    history_reward: Array
}, {
    timestamps: true,
});

schema.plugin(require('mongoose-regex-search'));

schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', schema);