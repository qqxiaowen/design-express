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

// 教师发起定位考勤
router.post('/teacher', adminAuth, async (req, res, next) => {
    try {
        let {teacherLocation, grade, clockName, course} = req.body;
        let teacher = req.session.user._id;

        let findLocation = await location.find({grade, teacher});
        if (findLocation[0]) {
            res.json({
                code: 301,
                msg: '已经发起过定位考勤了',
                findLocation
            })
            return;
        }

        let allStudetnInfo = await student.find({grade});
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
            msg: '教师发起定位考勤成功',
            allStudetnInfo,
            content,
            clockLocation,
            data
        })

        // 设置5分钟后自动删除该临时定位表
        setTimeout( () => {
            location.deleteOne({_id: data.id}).then(data => {
                console.log('setTimeout函数下：',data);
                
            }).catch(err => {
                console.log('setTimeout函数下：',err);
            })
        }, 1000 * 60 * 5)
    } catch (err) {
        next(err);
    }
    
})

// 学生参与定位考勤
router.post('/student', auth, async (req, res ,next) => {
    try {
        let {grade, teacher, studentLocation} = req.body;
        let studentId = req.session.user._id

        let findData  = await location.findOne({grade, teacher})
        if (!findData) {
            res.json({
                code: 301,
                msg: '该课程教师并没有发起定位考勤或此次考勤已超时'
            })
        } else {
            let sub0 = findData.teacherLocation.lng - studentLocation.lng;
            let sub1 = findData.teacherLocation.lat - studentLocation.lat;
            let distance = Math.sqrt( Math.pow(sub0, 2) - Math.pow(sub1, 2) * 10000000 );
            
            if (distance < 16000) {
                // 出勤状态 16000约200m
                let newStudentItem = {
                    student: studentId,
                    status: 2
                }
                let update = await clock.updateOne({_id: findData.clockId, 'content.student': studentId}, {'$set':  {'content.$': newStudentItem}});
                res.json({
                    code: 0,
                    msg: '参与定位考勤成功',
                    update,
                    distance,
                    findData
                })
            } else {
                res.json({
                    code: 302,
                    msg: '距离过远',
                    distance
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
            .sort('-createTime')
            // .populate({
            //     path: 'content.student',
            //     select: 'username numId avatar sex'
            // })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'teacher',
                select: 'username'
            })
            .populate({
                path: 'course',
                select: 'course_name',
                populate: {
                    path: 'course_name',
                    select: 'subjectName'
                }
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
            .sort('-createTime')
            // .populate({
            //     path: 'content.student',
            //     select: 'username numId avatar sex'
            // })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'teacher',
                select: 'username'
            })
            .populate({
                path: 'course',
                select: 'course_name',
                populate: {
                    path: 'course_name',
                    select: 'subjectName'
                }
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
            .sort('-createTime')
            // .populate({
            //     path: 'content.student',
            //     select: 'username numId avatar sex'
            // })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'teacher',
                select: 'username'
            })
            .populate({
                path: 'course',
                select: 'course_name',
                populate: {
                    path: 'course_name',
                    select: 'subjectName'
                }
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

// 学生查看本班级考勤记录
router.get('/student', auth, async (req, res, next) => {
    try {
        let grade = req.session.user.grade._id;
        if (!grade) {
            res.json({
                code: 300,
                msg: '只有学生用户可查询'
            })
        } else {

            let data = await clock.find({grade})
            .sort('-createTime')
            // .populate({
            //     path: 'content.student',
            //     select: 'username numId avatar sex'
            // })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'teacher',
                select: 'username'
            })
            .populate({
                path: 'course',
                select: 'course_name',
                populate: {
                    path: 'course_name',
                    select: 'subjectName'
                }
            });
            res.json({
                code: 0,
                msg: '学生获取本班考勤成功',
                data
            })
        }
    } catch(err) {
        next(err);
    }
})

//查看单条考勤记录
router.get('/:id', auth, async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await clock.findById({_id: id})
            .populate({
                path: 'content.student',
                select: 'username numId avatar sex'
            })
            .populate({
                path: 'grade',
                select: 'gradeName'
            })
            .populate({
                path: 'teacher',
                select: 'username'
            })
            .populate({
                path: 'course',
                select: 'course_name',
                populate: {
                    path: 'course_name',
                    select: 'subjectName'
                }
            });
        res.json({
            code: 0,
            msg: '获取单个考勤信息成功',
            data
        })

    } catch (err) {
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