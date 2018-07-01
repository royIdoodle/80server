var express = require('express');
var router = express.Router();
// import account from '../service/account'
let account = require('../service/account')

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

module.exports = router;
