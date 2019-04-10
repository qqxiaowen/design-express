const router = require('express').Router();
const major = require('../model/major');
const grade = require('../model/grade');

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
        next(err);
    }
})

// 获取某个院系下的所有专业信息
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await major.find({faculty: id})
                .populate({
                    path: 'faculty',
                    select: 'facultyName'
                });
        res.json({
            code: 0,
            msg: '获取某个院系下的专业信息成功',
            data
        })
        
    } catch(err) {
        next(err);
    }
})

// 添加专业
router.post('/', async (req, res, next) => {
    try {
        let {faculty, majorName} = req.body;

        let isRequire = await major.findOne({faculty, majorName});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '专业名冲突'
            })
        } else {

            let data = await major.create({faculty, majorName});
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

// 删除专业
router.delete('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        
        let gradeData = await grade.findOne({major: id});
        if (gradeData) {
            res.json({
                code: 300,
                msg: '该院系下还有专业',
            })
        } else {

            await major.deleteOne({_id: id});
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