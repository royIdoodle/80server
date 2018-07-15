const mongoose = require('mongoose');
const MemberService = require('./member');


const Model = {
    //会员ID
    memberId: {
        type: 'String'
    },
    //门店ID
    shopId: {
        type: Number
    },
    //消费时间
    time: {
        type: Date,
        default: function () {
            return Date.now();
        }
    },
    //消费类型
    type: {
        type: String,
        default: 'haircut',  //haircut: 理发；perm：烫发；shopping：购买；recharge：充值
    },
    //消费内容记录
    content: {
        type: String,
        default: ''
    },
    //消费值
    count: {
        type: Number,
        default: 0
    }
};

const Consume = mongoose.model('consume', Model);

const TYPE = {
    HAIR_CUT: 'haircut',
    PERM: 'perm',
    SHOPPING: 'shopping',
    RECHARGE: 'recharge',
    OTHER: 'other'
};

/**
 * 增加一个消费记录
 * @param memberId
 * @param shopId
 * @param type
 * @param count
 */
function addConsume({memberId, shopId, type, count}) {
    const thisConsume = new Consume({memberId, shopId, type, count});
    return thisConsume.save().then(() => {
        let balance = 0;
        if(type !== TYPE.RECHARGE){
            balance = -1 * count;
        }else {
            balance = count;
        }
        return MemberService.modifyBalance({id: memberId, balance})
    })
}

function getConsumeList({memberId}) {
    return Consume.find({memberId}).sort({time: -1})
}


/**
 *
 * @param id
 * @param number
 * @param shopId
 * @param type
 */
function recharge({id, number, shopId, type = 'balance'}) {
    return addConsume({memberId: id, count: number, shopId, type: TYPE.RECHARGE})
}

module.exports = {
    TYPE,
    add: addConsume,
    list: getConsumeList,
    recharge
};