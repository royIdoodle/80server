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



module.exports = router;
