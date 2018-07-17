const mongoose = require('mongoose');
const weixinService = require('./weixin');

const Model = {
    openId: String,
    token: String,
    shopId: {
        type: String,
        default: 1
    },
    expireTime: {
        type: Date,
        default: function () {
            //默认过期时间为7天
            return Date.now() + 1000 * 60 * 60 * 24 * 7;
        }
    }
};

const Authorize = mongoose.model('authorize', Model);

function updateToken(code) {
    return weixinService.getOpenIdSession(code).then(({openid, session_key}) => {
        const token = session_key.split('').reverse().join(''),
            updateObj = {
                token,
                expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
                shopId: 1
            };
        return Authorize.updateOne({openId: openid}, updateObj, {upsert: true}).then(() => {
            return { token }
        })
    })
}

function validateToken(token){

}

module.exports = {
    login: updateToken,
    validate: validateToken
};