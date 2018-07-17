const express = require('express');
const router = express.Router();
let authorize = require('../service/authorize');
let mb = require('../lib/messageBox');

//登录
router.post('/login', function(req, res) {
    const code = req.query.code;
    console.log({code})
    authorize.login(code).then((msg) => {
        res.send(mb.success(msg))
    }).catch(err => {
        res.send(mb.error(err))
    });
});

module.exports = router;
