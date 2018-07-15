const mongoose = require('mongoose');


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
    balance: {
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
function addMember(info = {}) {
    info.createTime = Date.now();
    if (!info.phone) {
        throw ('没有电话号 phone');
    } else {
        return Member.findOne({phone: info.phone}).then(result => {
            if (result) {
                throw '电话号码已存在！'
            } else {
                const thisMember = new Member(info);
                return thisMember.save();
            }
        })
    }
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
 * @param id
 * @param query
 * @returns {Query}
 */
function editMember(id, query) {
    return Member.updateOne({_id: id}, query);
}


function findMember(id) {
    return Member.findOne({'_id': mongoose.Types.ObjectId(id)});
}

/**
 * 获取会员列表
 * @param page
 * @param count
 */
function getMemberList({page = 0, count = 10}) {
    const skipCount = page * count;
    return Member.find().skip(skipCount).limit(Number(count));
}

/**
 * 充值
 * @param id
 * @param balance
 * @returns {void|Query}
 */
function modifyBalance({id, balance}){
    return Member.findOneAndUpdate({_id: id}, { $inc: {balance: balance}})
}


module.exports = {
    add: addMember,
    remove: deleteMember,
    edit: editMember,
    find: findMember,
    list: getMemberList,
    modifyBalance
};