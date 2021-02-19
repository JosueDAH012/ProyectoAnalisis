var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Login');
});

router.get('/registro', function(req, res, next) {
    res.render('Admin');
});

router.get('/userTable', function(req, res, next) {
    res.render('UserTables');
});




module.exports = router;