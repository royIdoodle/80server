var express = require('express');
var router = express.Router();
let share = require('../service/share.js');
let mb = require('../lib/messageBox');

/* GET share settings. */
//获取会员信息
router.get('/settings/:id', (req, res) => {
  const {id} = req.params;
  // 这一步JSONP必备
  var _callback = req.query.callback;
  // 这个responseData是后台要传回给前台的数据

  // 返回数据定义
  let responseData = {
    title: '测试用XXXXtitle',
    description: '测试用description',
    image: 'https://zens-pic.oss-cn-shenzhen.aliyuncs.com/static/space/production-pic1.png',
    url: 'http://m.51tiangou.com',  //分享url
    style: 'inline',      // 取值范围： inline 行内显示；sticky 固定位置显示
    alignment: 'left',      // 仅在style为sticky时有效，取值范围： top right bottom left
    networks: ['wechat', 'weibo', 'facebook', 'twitter']          // 取值范围：参考shareThis https://github.com/sharethis-github/sharethis-reactjs#sharing-networks
  }
  if (_callback){
    // 这两步设置发送也是NODE.JS发送JSONP必备
    res.type('text/javascript');
    res.send(_callback + '(' + JSON.stringify(responseData) + ')');
  }
  else{
    res.json(responseData);
  }
});

//获取会员信息
router.get('/get/:id', (req, res) => {
  const {id} = req.params;
  share.get(id).then(result => {
    res.send(mb.success(result))
  })
});


router.post('/add', (req, res) => {
  share.add(req.query).then(result => {
    res.send(mb.success(result));
  }).catch(err => {
    res.send(mb.error(err));
  })
});

router.post('/update/:id', (req, res) => {
  const {id} = req.params;
  share.update(id, req.query).then(result => {
    res.send(mb.success(result));
  }).catch(err => {
    res.send(mb.error(err));
  })
});

module.exports = router;
