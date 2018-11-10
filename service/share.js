const mongoose = require('mongoose');


const Model = {
    // memberId: Number,       //会员ID
  name: String,
  createTime: {
    type: Date,
    default: Date.now()
  },
  modifyTime: {
    type: Date,
    default: Date.now()
  },
  settings: Object
};

const Share = mongoose.model('share', Model);

// 增加配置信息
function addSettings (settings) {
  const share = new Share(settings);
  return share.save();
}

// 获取配置信息
function getSettings (id) {
  return Share.findOne({'_id': mongoose.Types.ObjectId(id)});
}

// 更新配置信息
function updateSettings(id, settings) {
  return Share.updateOne({_id: id}, Object.assign(settings, {modifyTime: Date.now()}));
}



module.exports = {
  add: addSettings,
  get: getSettings,
  update: updateSettings
};