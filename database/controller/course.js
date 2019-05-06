const router = require('express').Router();

const course = require('../model/course');

const adminAuth = require('./adminAuth');

// 获取全部课程表 暂时不用
router.get('/', async (req, res, next) => {
    try {

        let data = await course.find()
            .populate({
                path: 'teacher',
                select: 'avatar username'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'course_name',
                select: 'subjectName'
            });
        res.json({
            code: 0,
            msg: '获取全部课程信息成功',
            data
        })
    } catch(err) {
        next(err);
    }
})

// 获取单个课程表
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await course.findById({_id: id})
            // .populate({
            //     path: 'teacher',
            //     select: 'avatar username'
            // })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            // .populate({
            //     path: 'course_name',
            //     select: 'subjectName'
            // });
        res.json({
            code: 0,
            msg: '获取单个课程信息成功',
            data
        })
    } catch(err) {
        next(err);
    }
})

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
            })
            .populate({
                path: 'course_name',
                select: 'subjectName'
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
            })
            .populate({
                path: 'course_name',
                select: 'subjectName'
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
router.post('/', adminAuth, async (req, res, next) => {
    try {
        let {course_name, time_site, grade, teacher} = req.body;
        
        let data = await course.create({course_name, time_site, grade, teacher});
        res.json({
            code: 0,
            msg: '添加成功',
            data
        })
    } catch(err) {
        next(err);
    }
})

// 修改课程表
router.put('/:id', adminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {course_name, time_site, grade, teacher} = req.body;
       
        await course.updateOne({_id: id}, {$set: {course_name, time_site, grade, teacher}});
        res.json({
            code: 0,
            msg: '修改成功'
        })
    } catch(err) {
        next(err);
    }
})

// 删除课程表
router.delete('/:id', adminAuth, async (req, res, next) => {
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