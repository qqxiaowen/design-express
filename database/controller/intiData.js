const router = require('express').Router();

const teacher = require('../model/teacher');
const student = require('../model/student');
const faculty = require('../model/faculty');
const major = require('../model/major');
const grade = require('../model/grade');
const subject = require('../model/subject');
const course = require('../model/course');

router.get('/', async (req, res, next) => {
    try {
        let isFirstInit = await faculty.findOne({facultyName: '信息工程学院'});
        if (!isFirstInit) {
            let addFaculty = await faculty.create({
                facultyName: '信息工程学院',
                desc: '这是信心工程学院的简介'
            })
    
            let addMajor = await major.create({
                majorName: '软件工程',
                faculty: addFaculty._id,
                desc: '这是软件工程专业的简介'
            })
    
            let addGrade = await grade.create({
                gradeName: '软工1501B',
                major: addMajor._id,
                desc: '这是软工1501B班的简介'
            })
    
            let addTeacher = await teacher.create({
                username: '牛小梅',
                numId: '1001',
                password: '123456',
                desc: '这是第一个教师用户',
                avatar: 'http://pbl.mawenli.xyz/avatar0.png',
                faculty: addFaculty._id,
                sex: 0,
                superAdmin: 1
            })
    
            let addStudent = await student.create({
                username: '肖文',
                numId: '1534120211',
                password: '123456',
                desc: '这是第1个学生用户',
                avatar: 'http://pbl.mawenli.xyz/avatar1.png',
                grade: addGrade._id,
                sex: 1
            })

            // 测试批量添加学生
            let addStudents = await student.insertMany([
                {
                    username: '肖文2',
                    numId: '1534120212',
                    password: '123456',
                    desc: '这是第2个学生用户',
                    avatar: 'http://pbl.mawenli.xyz/avatar2.png',
                    grade: addGrade._id,
                    sex: 1
                },
                {
                    username: '肖文3',
                    numId: '1534120213',
                    password: '123456',
                    desc: '这是第3个学生用户',
                    avatar: 'http://pbl.mawenli.xyz/avatar3.png',
                    grade: addGrade._id,
                    sex: 1
                },
                {
                    username: '肖文4',
                    numId: '1534120214',
                    password: '123456',
                    desc: '这是第4个学生用户',
                    avatar: 'http://pbl.mawenli.xyz/avatar4.png',
                    grade: addGrade._id,
                    sex: 1
                },
                {
                    username: '肖文5',
                    numId: '1534120215',
                    password: '123456',
                    desc: '这是第5个学生用户',
                    avatar: 'http://pbl.mawenli.xyz/avatar5.png',
                    grade: addGrade._id,
                    sex: 1
                },
            ])

            let addSubject = await subject.create({
                subjectName: 'HTML+CSS+JavaScript',
                desc: '这是这门课程的简介'
            })

            let addCourse = await course.create({
                course_name: addSubject._id,
                time_site: [
                    {
                        day: 1,
                        node: 1,
                        classroom: '1#409'
                    }
                ],
                grade: addGrade._id,
                teacher: addTeacher._id

            })
    
            res.json({
                code: 0,
                msg: '添加成功',
                addFaculty,
                addMajor,
                addGrade,
                addTeacher,
                addStudent,
                addStudents,
                addSubject,
                addCourse
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
            msg: '已初始化过 catch(err)'
        })
        next(err);
    }
})

module.exports = router;