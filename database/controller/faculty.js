const router = require('express').Router();
const faculty = require('../model/faculty');
const major = require('../model/major');

// 获取所有院系信息
router.get('/', async (req, res, next) => {
    try {
        
        let data = await faculty.find();
        res.json({
            code: 0,
            msg: '获取所有院系信息成功',
            data,
        })
    } catch(err) {
        next(err);
    }
})

// 添加院系
router.post('/', async (req, res, next) => {
    try {
        let {facultyName} = req.body;
        let isRequire = await faculty.find({facultyName});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '院系名冲突'
            })
        } else {
            let data = await faculty.create({facultyName});
            res.json({
                code: 0,
                msg: '添加成功',
                data
            })
        }
    } catch(err) {
        next(err);
    }
})

// 删除院系
router.delete('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        
        let majorData = await major.findOne({faculty: id});
        if (majorData) {
            res.json({
                code: 300,
                msg: '该院系下还有专业',
            })
        } else {

            await faculty.deleteOne({_id: id});
            res.json({
                code: 0,
                msg: '删除成功',
            })
        }
    } catch(err) {
        next(err);
    }
})

module.exports = router;