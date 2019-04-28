const express = require('express');
const router = express.Router();

const clock = require('../model/clock');
const location = require('../model/location');
const student = require('../model/student');

const adminAuth = require('./adminAuth');
const auth = require('./auth');

// 添加考勤表
router.post('/', adminAuth, async (req, res, next) => {
    try {
        let {clockName, content, teacher, grade, course} = req.body;

        let data = await clock.create({clockName, content, teacher, grade, course});
        res.json({
            code: 0,
            msg: '添加考勤成功',
            data
        })

    } catch (err) {
        next(err);
    }
})

// 教师发起自动考勤
router.post('/teacher'. adminAuth, async (req, res, next) => {
    try {
        let {teacherLocation, grade, clockName, course} = req.body;
        let teacher = req.sesison.user._id;

        let allStudetnInfo =  await student.find({grade}).select('-password');
        let content = [];
        allStudetnInfo.forEach( item => {
            let contentItem = {
                student: item._id,
                status: 0
            }
            content.push(contentItem);
        })

        let clockLocation = await clock.create({clockName, content, teacher, grade, course});

        let data = await location.create({teacherLocation, grade, teacher, clockId: clockLocation._id});

        res.json({
            code: 0,
            msg: '教师发起自动考勤成功',
            data
        })

        // 设置5分钟后自动删除该临时定位表
        setTimeout( () => {
            await location.deleteOne({_id: data.id})
        }, 1000 * 60 * 5)
    } catch (err) {
        next(err);
    }
    
})

// 学生参与自动考勤
router.post('/student', auth, async (req, res ,next) => {
    try {
        let {grade, teacher, studentLocation} = req.body;
        let studentId = req.session.user._id

        let findData  = await location.findOne({grade, teacher})
        if (!findData) {
            res.json({
                code: 301,
                msg: '该课程教师并没有发起自动考勤或此次考勤已超时'
            })
        } else {
            let sub0 = findData.teacherLocation[0] - studentLocation[0];
            let sub1 = findData.teacherLocation[1] - studentLocation[1];
            let distance = Math.sqrt( Math.pow(sub0, 2) - Math.pow(sub1, 2) * 10000000 );
            
            if (distance < 16000) {
                // 出勤状态

                let updata = clock.updateOne({_id: findData._id, $match: {"content.student": studentId}},{$set: {status: 1}});
                res.json({
                    code: 0,
                    msg: '参与自动考勤成功',
                    updata
                })
            } else {
                res.json({
                    code: 302,
                    msg: '距离过远'
                })
            }
        }
    } catch (err) {
        next(err);
    }
})

// 教师查看所有考勤记录 
router.get('/teacher', adminAuth, async (req, res, next) => {
    try {
        let teacher = req.session.user._id;

        let data = await clock.find({teacher})
            .populate({
                path: 'content.student',
                select: 'username numId avatar sex'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'course',
                select: 'name'
            });
        res.json({
            code: 0,
            msg: '教师获取个人下所有考勤成功',
            data
        })

    } catch (err) {
        next(err);
    }
})

// 教师根据课程id查看考勤记录 
router.get('/teacher/:course', adminAuth, async (req, res, next) => {
    try {
        let teacher = req.session.user._id;
        let {course} = req.params;

        let data = await clock.find({teacher, course})
            .populate({
                path: 'content.student',
                select: 'username numId avatar sex'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'course',
                select: 'name'
            });
        res.json({
            code: 0,
            msg: '教师获取某课程考勤成功',
            data
        })

    } catch (err) {
        next(err);
    }
})

// 学生根据课程id查看本班级考勤记录
router.get('/student/:course', auth, async (req, res, next) => {
    try {
        let grade = req.session.user.grade;
        let {course} = req.params;
        if (!grade) {
            res.json({
                code: 300,
                msg: '只有学生用户可查询'
            })
        } else {

            let data = await clock.find({grade, course})
                .populate({
                    path: 'content.student',
                    select: 'username numId avatar sex'
                })
                .populate({
                    path: 'grade',
                    select: 'gradeName'
                })
                .populate({
                    path: 'course',
                    select: 'name'
                });
            res.json({
                code: 0,
                msg: '学生获取本班某课程考勤成功',
                data
            })
        }
    } catch(err) {
        next(err);
    }
})

// 教师修改某条考勤记录
router.put('/:id', adminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {content} = req.body;

        await clock.updateOne({_id: id},{$set: {content}});
        res.json({
            code: 0,
            msg: '修改考勤记录成功'
        })
    } catch(err) {
        next(err);
    }
})

// 删除考勤记录
router.delete('/:id', adminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        await clock.deleteOne({_id: id});
        res.json({
            code: 0,
            msg: '删除成功'
        })
    } catch(err) {
        next(err);
    }
})

module.exports = router;