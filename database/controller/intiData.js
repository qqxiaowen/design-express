const router = require('express').Router();
const teacher = require('../model/teacher');
const student = require('../model/student');
const faculty = require('../model/faculty');
const major = require('../model/major');
const classTable = require('../model/class');

router.get('/', async (req, res, next) => {
    try {

        let addFaculty = await faculty.create({
            facultyName: '信息工程学院'
        })

        let addMajor = await major.create({
            majorName: '软件工程',
            faculty: addFaculty._id
        })

        let addClass = await classTable.create({
            className: '软工1501B',
            major: addMajor._id
        })

        let addTeacher = await teacher.create({
                username: '牛小梅',
                numId: '1001',
                password: '123456',
                desc: '这是第一个教室用户',
                avatar: 'http://pbl.mawenli.xyz/avatar1.png',
                nicheng: '这是我的昵称',
                faculty: addFaculty._id
            })

        let addStudent = await student.create({
            username: '肖文',
            numId: '1534120211',
            password: '123456',
            desc: '这是第一个学生用户',
            avatar: 'http://pbl.mawenli.xyz/avatar2.png',
            nicheng: '这是我的昵称',
            class: addClass._id
        })

        res.json({
            code: 200,
            msg: '添加成功',
            addFaculty,
            addMajor,
            addClass,
            addTeacher,
            addStudent
        })
        
    } catch(err) {
        next(err)
    }
})

module.exports = router;