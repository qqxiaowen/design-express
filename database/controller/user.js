const express = require('express');
const router = express.Router();

const teacher = require('../model/teacher');
const student = require('../model/student');
const course = require('../model/course');

const superAdminAuth = require('./superAdminAuth');
const adminAuth = require('./adminAuth');
const auth = require('./auth');

// 注册教师用户
router.post('/teacher', superAdminAuth, async (req, res, next) => {
    try {
        let {username, password, numId, faculty, desc, avatar, sex, superAdmin = 0} = req.body;

        let findData = await teacher.findOne({numId})
        if (!username || !password || !numId) {
            res.json({
                msg: '缺少必要参数',
                username,
                password,
                numId
            })
        } else if (findData) {
            res.json({
                msg: '该工号已被使用'
            })
        } else {
            if (!avatar) {
                let avatarNumber = Math.floor(Math.random() * 9);
                avatar = `http://pbl.mawenli.xyz/avatar${avatarNumber}.png`;
            }

            let data = await teacher.create({username, password, numId, faculty, desc, avatar, sex, superAdmin})
            res.json({
                code: 0,
                msg: '添加教师用户成功',
                data
            })
        }
        
    } catch(err) {
        next(err);
    }
})

// 获取全部教师用户
router.get(`/teacher`, superAdminAuth, async (req, res, next) => {
    try {
        let {pn = 1, size = 10} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);

        let data =  await teacher.find()
            .skip((pn-1) * size)
            .limit(size)
            .select('-password')
            .populate({
                path: 'faculty',
                select: 'facultyName'
            })
            .sort('-superAdmin faculty');
        let count = await teacher.count();
        res.json({
            code: 0,
            msg: '获取教师用户成功',
            data,
            count
        })

    } catch(err) {
        next(err);
    }
})

// 获取单个教师用户
router.get(`/teacher/:id`, adminAuth, async (req, res, next) => {
    try{
        let {id} = req.params;

        let data = await teacher.findById({_id:id})
            .select('-password')
            .populate({
                path: 'faculty',
                select: 'facultyName'
            });
        if (data) {
            res.json({
                code: 0,
                msg: '获取单个用户成功',
                data
            })
        } else {
            res.json({
                msg: '传入的id值有误'
            })
        }

   } catch(err) {
       next(err);
   }
   
})

// 修改单个教师用户
router.put(`/teacher/:id`, adminAuth, async (req, res, next) => {
    try{
        let {id} = req.params;
        let {username, faculty, desc, avatar, sex, superAdmin} = req.body;
        await teacher.updateOne({_id: id}, {$set: {username, faculty, desc, avatar, sex, superAdmin}});
        res.json({
            code: 0,
            msg: '修改成功'
        })

    } catch(err) {
        next(err);
    }
    
})

// 为教师用户添加超级管理员权限
router.put(`/teacher/:id`, superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        await teacher.updateOne({_id: id}, {$set: {superAdmin: 1}});
        res.json({
            code: 0,
            msg: '修改成功'
        })

    } catch(err) {
        next(err);
    }
    
})

// 删除单个教师用户
router.delete(`/teacher/:id`, superAdminAuth, async (req ,res, next) => {
    try {
        let {id} = req.params;
        let findCourse = await course.findOne({teacher: id});
        if (findCourse) {
            res.json({
                msg: '请先删除该教师下的课程表',
                findCourse
            })
        } else {

            await teacher.deleteOne({_id: id})
            res.json({
                code: 0,
                msg: '删除成功'
            })
        }

    } catch(err) {
        next(err);
    }
   
})

// 分割线-----------------------------------------------------------

// 注册普通用户
router.post('/student', superAdminAuth, async (req, res, next) => {
    try {
        let {username, password, numId, grade, desc, avatar, sex} = req.body;

        let findData = await student.findOne({numId})
        if (!username || !password || !numId) {
            res.json({
                msg: '缺少必要参数' 
            })
        } else if (findData) {
            res.json({
                msg: '该用户名已被注册'
            })
        } else{
            
            if (!avatar) {
                let avatarNumber = Math.floor(Math.random() * 9);
                avatar = `http://pbl.mawenli.xyz/avatar${avatarNumber}.png`;
            }

            let data = await student.create({username, password, numId, grade, desc, avatar, sex})

            res.json({
                code: 0,
                msg: '添加学生用户成功',
                data
            })
        }
        
    } catch(err) {
        next(err);
    }
})

// 获取全部普通用户
router.get(`/student`, superAdminAuth, async (req, res, next) => {
    try {
        let {pn = 1, size = 10} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);

        let data =  await student.find()
            .skip((pn-1) * size)
            .limit(size)
            .select('-password')
            .populate({
                path: 'grade',
                select: 'gradeName major',
                populate: {
                    path: 'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                }
            });

        let count = await student.count();
        res.json({
            code: 0,
            msg: '获取普通用户成功',
            data,
            count
        })

    } catch(err) {
        next(err);
    }
})

// 获取某个班级下的所有用户
router.get('/student/grade/:id', auth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {pn = 1, size = 10} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);

        let data =  await student.find({grade: id})
            .skip((pn-1) * size)
            .limit(size)
            .select('-password')
            .populate({
                path: 'grade',
                select: 'gradeName major',
                populate: {
                    path: 'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                }
            });

        let count = await student.count({grade: id});
        res.json({
            code: 0,
            msg: '获取班级下用户成功',
            data,
            count
        })

    } catch(err) {
        next(err);
    }
})

// 获取单个普通用户
router.get(`/student/:id`, auth, async (req, res, next) => {
    try{
        let {id} = req.params;

        let data = await student.findById({_id:id})
        .select('-password')
        .populate({
            path: 'grade',
            select: 'gradeName major',
            populate: {
                path: 'major',
                select: 'majorName faculty',
                populate: {
                    path: 'faculty',
                    select: 'facultyName'
                }
            }
        });
        if (data) {
            res.json({
                code: 0,
                msg: '获取单个用户成功',
                data
            })
        } else {
            res.json({
                msg: '传入的id值有误'
            })
        }

   } catch(err) {
       next(err);
   }
   
})

// 修改单个普通用户 管理员和个人用户可操作
router.put(`/student/:id`, auth, async (req, res, next) => {
    try{
        let {id} = req.params;
        let {username, grade, desc, avatar, sex} = req.body;
        let isTeacher = await teacher.findById(req.session.user._id);
        if (isTeacher && isTeacher.superAdmin == 1 || req.session.user._id == id) {
            // 是管理员用户 或个人用户

            await student.updateOne({_id: id},{$set: {username, grade, desc, avatar, sex}});
            res.json({
                code: 0,
                msg: '修改成功'
            })
        } else {
            res.json({
                code: 300,
                msg: '权限不足'
            })
        }

    } catch(err) {
        next(err);
    }
})

// 删除单个普通用户
router.delete(`/student/:id`, superAdminAuth, async (req, res, next) => {
    try{
        let {id} = req.params;
        await student.deleteOne({_id: id})
        res.json({
            code: 0,
            msg: '删除成功'
        })

    } catch(err) {
        next(err);
    }
   
})

// 分割线----------------------------------------------

// 用户修改个人密码
router.put(`/password/:id`, auth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {password, newPassword} = req.body;
        let findTeacher = await teacher.findById({_id: id});
        let findStudent = await student.findById({_id: id});
        if (findTeacher && findTeacher.password == password) {
            // 教师用户

            await teacher.updateOne({_id: id}, {$set: {password: newPassword}});
            req.session.user = '';
            res.json({
                code: 0,
                msg: '教师用户修改个人密码成功'
            })
        } else if(findStudent && findStudent.password ==password) {
            // 学生用户

            await student.updateOne({_id: id}, {$set: {password: newPassword}});
            req.session.user = '';
            res.json({
                code: 0,
                msg: '学生用户修改个人密码成功'
            })
        } else {
            res.json({
                msg: '输入原密码错误'
            })
        }
    } catch(err) {
        next(err);
    }
})

// 分割线----------------------------------------------

// 用户登录
router.post('/login', async (req, res, next) => {
    try{
        let {numId, password} = req.body;

        let teacherData = await teacher.findOne({numId})
            .populate({
                path: 'faculty',
                select: 'facultyName'
            });

        let studentData = await student.findOne({numId})
        .populate({
            path: 'grade',
            select: 'gradeName'
        });
        if (numId && password) {
            if (!teacherData && !studentData) {
                res.json({
                    msg:'该用户不存在',
                    teacherData,
                    studentData
                })
            } else if (teacherData && teacherData.password == password) {
                req.session.user = teacherData;
                res.json({
                    code: 0,
                    msg: '教师用户登录成功',
                    data: teacherData
                })
            } 
            else if (studentData && studentData.password == password) {
                req.session.user = studentData;
                res.json({
                    code: 0,
                    msg: '学生用户登录成功',
                    data: studentData
                })
            }
            else {
                res.json({
                    msg: '密码错误'
                })
            }
        }
       
    } catch(err) {
        next(err);
    }
})

// 退出登录
router.get(`/logout`, auth, (req, res) => {
    req.session.user = ''
    res.json({
        code: 0,
        msg: '退出登录成功'
    })
})

router.get('/myself', adminAuth, async (req, res, next) => {
    try {
        let _id = req.session.user._id

        let teacherData = await teacher.findById({_id}).select('-password');

        // let studentData = await student.findById({_id}).select('-password');

        res.json({
            code: 0,
            msg: '获取个人信息',
            data: teacherData
        })
    } catch(err) {

        next(err);
    }
})
module.exports = router;