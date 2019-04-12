var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

router.use('/init', require('../database/controller/intiData'));
router.use('/faculty', require('../database/controller/faculty'));
router.use('/major', require('../database/controller/major'));
router.use('/grade', require('../database/controller/grade'));
router.use('/user', require('../database/controller/user'));
router.use('/course', require('../database/controller/course'));
router.use('/clock', require('../database/controller/clock'));
module.exports = router;