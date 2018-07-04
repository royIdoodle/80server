let config = require('../config/mongo_config');
const mongoose = require('mongoose');
const {path, dbAccount} = config;
mongoose.connect(`${path}${dbAccount}`);

const Model = {
    memberId: Number,       //会员ID
    name: String,
    createTime: Date,
    phone: String,
    sex: String,
    age: Number,
    tags: Array,            //用户标签
    cardType: String,       //年卡、次卡、充值
    address: String,        //地址
    inShopCount: Number,    //进店次数
    consumeCount: Number,   //消费次数
    consumeIdList: Array,   //消费明细ID列表
};

const Member = mongoose.model('member', Model);

/**
 * 添加会员
 * @param info
 */
function addMember(info = {}){
    info.createTime = Date.now();
    const thisMember = new Member(info);
    //TODO 电话号码重复性校验

    return thisMember.save();
}

function deleteMember(memberId) {
    
}

function editMember(memberId) {
    
}

function findMember(memberId) {

}

module.exports = {
    add: addMember,
    delete: deleteMember,
    edit: editMember,
    find: findMember
};