const router = require('express').Router();

const teacher = require('../model/teacher');
const student = require('../model/student');
const faculty = require('../model/faculty');
const major = require('../model/major');
const grade = require('../model/grade');

router.get('/', async (req, res, next) => {
    try {
        let isFirstInit = await faculty.findOne({facultyName: '信息工程学院'});
        if (!isFirstInit) {
            let addFaculty = await faculty.create({
                facultyName: '信息工程学院'
            })
    
            let addMajor = await major.create({
                majorName: '软件工程',
                faculty: addFaculty._id
            })
    
            let addGrade = await grade.create({
                gradeName: '软工1501B',
                major: addMajor._id
            })
    
            let addTeacher = await teacher.create({
                username: '牛小梅',
                numId: '1001',
                password: '123456',
                desc: '这是第一个教师用户',
                avatar: 'http://pbl.mawenli.xyz/avatar1.png',
                faculty: addFaculty._id,
                sex: 0
            })
    
            let addStudent = await student.create({
                username: '肖文',
                numId: '1534120211',
                password: '123456',
                desc: '这是第一个学生用户',
                avatar: 'http://pbl.mawenli.xyz/avatar2.png',
                grade: addGrade._id,
                sex: 1
            })
    
            res.json({
                code: 0,
                msg: '添加成功',
                addFaculty,
                addMajor,
                addGrade,
                addTeacher,
                addStudent
            })
        } else {
            res.json({
                code: 403,
                msg: '已初始化过'
            })
        }
        
    } catch(err) {
        res.json({
            code: 403,
            msg: '已初始化过 err'
        })
        next(err);
    }
})

module.exports = router;