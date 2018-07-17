const express = require('express');
const router = express.Router();
let member = require('../service/member'),
    consume = require('../service/consume');
let mb = require('../lib/messageBox');

//添加会员
router.post('/add', (req, res) => {
    member.add(req.query).then(result => {
        res.send(mb.success(result));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

//获取会员列表
router.get('/list/:page/:count', (req, res) => {
    member.list(req.params).then(list => {
        res.send(mb.success(list));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

// 删除指定会员
router.post('/remove', (req, res) => {
    const {phone} = req.query;
    member.remove({phone}).then(list => {
        res.send(mb.success(list));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

// 修改指定会员信息
router.post('/edit/:id', (req, res) => {
    const {id} = req.params;
    member.edit(id, req.query).then(result => {
        res.send(mb.success(result));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

//获取会员信息
router.get('/get/:id', (req, res) => {
    const {id} = req.params;
    member.find(id).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

//会员充值
router.post('/recharge/:id', (req, res) => {
    const {id} = req.params,
        {number, shopId = 1} = req.query;
    consume.recharge({id, number, shopId}).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

module.exports = router;
