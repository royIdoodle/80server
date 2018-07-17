const https = require('https');
const fs = require('fs');
const {APP_ID, SECRET} = require('../config/weixin_config');

function getOpenIdSession(code){
    const getUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
    console.log(getUrl)
    return new Promise((resolve, reject) => {
        https.get(getUrl, (res) => {
            res.on('data', function(res){
                resolve(JSON.parse(res.toString()))
            });
        })
    })


}

module.exports = {
    getOpenIdSession
};