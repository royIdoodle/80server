var express = require('express');
var router = express.Router();
let account = require('../service/account'),
    member = require('../service/member');
let mb = require('../lib/messageBox');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    res.send('sdsa')
});

router.get('/save', function (req, res, next) {
    account.save();
    res.send('saved')
});

router.get('/find', function (req, res, next) {
    account.find().then(result => {
        res.send(result)
    });

});

router.post('/member/add', (req, res, next) => {
    member.add(req.query).then(result => {
        res.send(result);
    })
});

//获取会员列表
router.get('/member/list/:page/:count', (req, res, next) => {
    // mem
    member.list(req.params).then(list => {
        res.send(list);
    });
});

// 删除指定会员
router.post('/member/remove', (req, res, next) => {
    const {phone} = req.query;
    member.remove({phone}).then(list => {
        res.send(list);
    }).catch(err => {
        res.send(err);
    })
});

// 修改指定会员信息
router.post('/member/edit/:phone', (req, res, next) => {
    const {phone} = req.params;
    member.edit(phone, req.query).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
});

router.get('/member/get/:id', (req, res, next) => {
    const {id} = req.params;
    member.find(id).then(info => {
        res.send(info);
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;
