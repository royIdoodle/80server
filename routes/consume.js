const express = require('express');
const router = express.Router();
const consume = require('../service/consume');
const mb = require('../lib/messageBox');

//添加消费记录
router.post('/add/:shopId/:memberId', (req, res) => {
    const {shopId, memberId} = req.params;
    const {type, count} = req.query;
    consume.add({shopId, memberId, type, count}).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

//获取消费记录
router.get('/list/:memberId', (req, res) => {
   const {memberId} = req.params;
   consume.list({memberId}).then(info => {
       res.send(mb.success(info));
   }).catch(err => {
       res.send(mb.error(err));
   })
});

module.exports = router;
