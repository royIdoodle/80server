var express = require('express');
var router = express.Router();
let account = require('../service/account'),
    member = require('../service/member'),
    consume = require('../service/consume');
let mb = require('../lib/messageBox');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/save', function (req, res) {
    account.save().then(() => {
        res.send(mb.success('saved'));
    });

});

router.get('/find', function (req, res) {
    account.find().then(result => {
        res.send(mb.success(result));
    });

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
