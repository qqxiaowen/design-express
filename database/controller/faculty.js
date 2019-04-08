const router = require('express').Router();
const faculty = require('../model/faculty');
const major = require('../model/major');

// 获取所有院系信息
router.get('/', async (req, res, next) => {
    try {
        
        let data = await faculty.find();

        let majorCount = await major.find({faculty: data._id});
        res.json({
            code: 0,
            msg: '获取所有院系信息成功',
            data,
            majorCount
        })
    } catch(err) {
        next(err);
    }
})



module.exports = router;