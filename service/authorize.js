const mongoose = require('mongoose');
const weixinService = require('./weixin');
const _ = require('lodash');

const Model = {
    openId: String,
    token: {
        type: String,
        index: true
    },
    shopId: String,
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

    return weixinService.getOpenIdSession(code)
        .then(({openid, session_key}) => {
            const token = session_key.split('').reverse().join('');
            return {
                token,
                expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7
            }
        })
        .then(updateObj => {
            return Authorize.updateOne({openId: openid}, updateObj, {upsert: true})
        })
        .then(() => {
            return Authorize.findOne({openId: openid})
        });
}


/**
 * 绑定门店 通过门店ID和门店信息
 * @param openId
 * @param shopInfo
 */
function bindNewShop({token, shopInfo}){
    return Authorize.findOne({token}).then(authInfo => {

    })
}

/**
 * 通过token来查找门店ID
 * @param token
 * @returns {Promise}
 */
function getShopIdByToken(token){
    return Authorize.findOne({token}).then(auth => auth.shopId);
}

module.exports = {
    login: updateToken,
    bindNewShop,
    getShopIdByToken
};