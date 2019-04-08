var express = require('express');
var router = express.Router();

// router.get('/', function (req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

// router.use('/teacher', require('../database/controller/teacher'));
router.use('/init', require('../database/controller/intiData'));
router.use('/faculty', require('../database/controller/faculty'));
router.use('/major', require('../database/controller/major'));
router.use('/class', require('../database/controller/class'));
module.exports = router;