var express = require('express');
var router = express.Router();
let account = require('../service/account'),
    member = require('../service/member'),
    consume = require('../service/consume');
let mb = require('../lib/messageBox');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/save', function (req, res, next) {
    account.save().then(() => {
        res.send(mb.success('saved'));
    });

});

router.get('/find', function (req, res, next) {
    account.find().then(result => {
        res.send(mb.success(result));
    });

});

router.post('/member/add', (req, res, next) => {
    member.add(req.query).then(result => {
        res.send(mb.success(result));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

//获取会员列表
router.get('/member/list/:page/:count', (req, res, next) => {
    member.list(req.params).then(list => {
        res.send(mb.success(list));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

// 删除指定会员
router.post('/member/remove', (req, res, next) => {
    const {phone} = req.query;
    member.remove({phone}).then(list => {
        res.send(mb.success(list));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

// 修改指定会员信息
router.post('/member/edit/:phone', (req, res, next) => {
    const {phone} = req.params;
    member.edit(phone, req.query).then(result => {
        res.send(mb.success(result));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

router.get('/member/get/:id', (req, res, next) => {
    const {id} = req.params;
    member.find(id).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

router.post('/member/recharge/:id', (req, res) => {
    const {id} = req.params,
        {number, shopId = 1} = req.query;
    member.recharge({id, number, shopId}).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

router.post('/consume/add/:shopId/:memberId', (req, res) => {
    const {shopId, memberId} = req.params;
    const {type, count} = req.query;
    consume.add({shopId, memberId, type, count}).then(info => {
        res.send(mb.success(info));
    }).catch(err => {
        res.send(mb.error(err));
    })
});

router.get('/consume/list/:memberId', (req, res) => {
   const {memberId} = req.params;
   consume.list({memberId}).then(info => {
       res.send(mb.success(info));
   }).catch(err => {
       res.send(mb.error(err));
   })
});

module.exports = router;
