const router = require('express').Router();
const course = require('../model/course');

const adminauth = require('./adminauth');

// 获取某班级下的所有课程表
router.get('/grade/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await course.find({grade: id})
            .populate({
                path: 'teacher',
                select: 'avatar username'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            });
        res.json({
            code: 0,
            msg: '获取班级下的课程表成功',
            data,
        })
    } catch(err) {
        next(err);
    }
})

// 获取某教师下的所有课程表
router.get('/teacher/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await course.find({teacher: id})
            .populate({
                path: 'teacher',
                select: 'avatar username'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            });
        res.json({
            code: 0,
            msg: '获取教师下的课程表成功',
            data,
        })
    } catch(err) {
        next(err);
    }
})

// 添加课程表
router.post('/', adminauth, async (req, res, next) => {
    try {
        let {name, time_site, grade, teacher} = req.body;
        let isRequire = await course.findOne({name});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '已有该课程'
            })
        } else {
            let data = await course.create({name, time_site, grade, teacher});
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

// 删除课程表
router.delete('/:id', adminauth, async (req, res, next) => {
    try {
        let {id} = req.params;
            
        await course.deleteOne({_id: id});
        res.json({
            code: 0,
            msg: '删除成功',
        })
    } catch(err) {
        next(err);
    }
})

module.exports = router;