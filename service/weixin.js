const http = require('http');
const {APP_ID, SECRET} = require('../config/weixin_config');

function getOpenIdSession(code){
    http.get(`https://api.weixin.qq.com/sns/jscode2session?
    appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`).then((a,b) => {
        console.log({a,b})
    })
}

module.exports = {
    getOpenIdSession
};