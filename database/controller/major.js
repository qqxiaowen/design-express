const router = require('express').Router();
const major = require('../model/major');

// 获取所有专业信息
router.get('/', async (req, res, next) => {
    try {

        let data = await major.find()
                .populate({
                    path: 'faculty',
                    select: 'facultyName'
                });
        res.json({
            code: 0,
            msg: '获取所有专业信息成功',
            data
        })
        
    } catch(err) {
        next(err)
    }
   
})


module.exports = router;