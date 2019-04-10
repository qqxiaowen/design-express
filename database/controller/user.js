const express = require('express');
const router = express.Router();

const teacher = require('../model/teacher');
const student = require('../model/student');
const adminauth = require('./adminauth');
const auth = require('./auth');

// 注册管理员用户
router.post('/teacher', adminauth, async (req, res, next) => {
    try {
        let {username, password, numId, faculty, desc, avatar, sex} = req.body;

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
                msg: '该帐号已被注册'
            })
        } else{
            
            if (!avatar) {
                let avatarNumber = Math.floor(Math.random() * 9);
                avatar = `http://pbl.mawenli.xyz/avatar${avatarNumber}.png`;
            }

            let data = await teacher.create({username, password, numId, faculty, desc, avatar, sex})

            res.json({
                code: 0,
                msg: '添加管理员用户成功',
                data
            })
        }
        
    } catch(err) {
        next(err);
    }
})

// 获取全部管理员用户
router.get(`/teacher`, adminauth, async (req,res,next) => {
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
            });
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

// 获取单个管理员用户
router.get(`/teacher/:id`, adminauth, async (req,res,next) => {
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

// 修改单个管理员用户
router.put(`/teacher/:id`, adminauth, async (req,res,next) => {
    try{
        let {id} = req.params;
        let {username, password, faculty, desc, avatar, sex} = req.body;
        let data = await teacher.updateOne({_id: id},{$set:{username, password, faculty, desc, avatar, sex}})
        res.json({
            code: 0,
            msg: '修改成功',
            data
        })

    } catch(err) {
        next(err);
    }
    
})

// 删除单个管理员用户
router.delete(`/teacher/:id`, adminauth, async (req,res,next) => {
    try{
        let {id} = req.params;
        await teacher.deleteOne({_id: id})
        res.json({
            code: 0,
            msg: '删除成功'
        })

    } catch(err) {
        next(err);
    }
   
})

// 分割线-----------------------------------------------------------下面改成普通用户

// 注册普通用户
router.post('/student', adminauth, async (req, res, next) => {
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
router.get(`/student`, adminauth, async (req,res,next) => {
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
            })
            .populate({
                path: 'major',
                populate: {
                    path: 'faculty'
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

// 获取单个普通用户
router.get(`/student/:id`, auth, async (req,res,next) => {
    try{
        let {id} = req.params;

        let data = await student.findById({_id:id})
        .select('-password')
        // .populate({
        //     path: 'grade',
        // });
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

// 修改单个普通用户
router.put(`/student/:id`, adminauth, async (req,res,next) => {
    try{
        let {id} = req.params;
        let {username, password, grade, desc, avatar, sex} = req.body;

        let data = await student.updateOne({_id: id},{$set:{username, password, grade, desc, avatar, sex}})
        res.json({
            code: 0,
            msg: '修改成功',
            data
        })

    } catch(err) {
        next(err);
    }
    
})

// 删除单个普通用户
router.delete(`/student/:id`,adminauth,async (req,res,next) => {
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

// 用户登录
router.post('/login', async (req, res, next) => {
    try{
        let {numId, password} = req.body;

        let teacherData = await teacher.findOne({numId});

        let studentData = await student.findOne({numId});
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

// 学生表的班级信息多表关联问题 populate方法

// 退出登录
router.get(`/logout`, auth , (req,res) => {
    req.session.user = ''
    res.json({
        code: 0,
        msg: '退出登录成功'
    })
})

module.exports = router;