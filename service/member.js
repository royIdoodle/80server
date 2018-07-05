let config = require('../config/mongo_config');
const mongoose = require('mongoose');
const {path, dbAccount} = config;
mongoose.connect(`${path}${dbAccount}`);

const Model = {
    // memberId: Number,       //会员ID
    name: String,
    createTime: Date,
    phone: String,
    sex: {
        type: String,
        default: 'male'
    },
    age: Number,
    birthday: Date,         //生日
    tags: Array,            //用户标签
    cardType: {             //年卡 year、次卡 count、充值 balance、普通卡 normal
        type: String,
        default: 'normal'
    },
    address: String,        //地址
    inShopCount: {
        type: Number,
        default: 0
    },    //进店次数
    consumeCount: {         //消费次数
        type: Number,
        default: 0
    },
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

/**
 *
 * @param query 删除条件
 */
function deleteMember(query) {
    return Member.deleteOne(query);
}

/**
 * 修改会员信息
 * @param phone
 * @param query
 * @returns {Query}
 */
function editMember(phone, query) {
    return Member.updateOne({phone}, query);
}


function findMember(id) {
    console.log(id)
    return Member.findOne({'_id': mongoose.Types.ObjectId(id)});
}

/**
 * 获取会员列表
 * @param startNum
 * @param pageCount
 */
function getMemberList({startNum, pageCount}) {
    return Member.find();
}

module.exports = {
    add: addMember,
    remove: deleteMember,
    edit: editMember,
    find: findMember,
    list: getMemberList
};