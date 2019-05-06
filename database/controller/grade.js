const router = require('express').Router();

const grade = require('../model/grade');

const superAdminAuth = require('./superAdminAuth');

// 获取所有班级信息 暂时不用
router.get('/', async (req, res, next) => {
    try {
        let {pn, size} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);
        let data = await grade.find()
                .skip((pn - 1) * size)
                .limit(size)
                .sort({_id: -1})
                .populate({
                    path: 'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                });
        res.json({
            code: 0,
            msg: '获取所有班级信息成功',
            data
        })

    } catch(err) {
        next(err)
    }
})

// 获取某个专业下的所有班级信息
router.get('/major/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await grade.find({major: id})
                .sort({_id: -1})
                .populate({
                    path:'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                });
        
        res.json({
            code: 0,
            msg: '获取某个专业下的所有班级信息成功',
            data
        })
        
    } catch(err) {
        next(err);
    }
})

// 获取单个班级信息
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await grade.findById({_id: id})
                .populate({
                    path:'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                });
        
        res.json({
            code: 0,
            msg: '获取某个班级信息成功',
            data
        })
        
    } catch(err) {
        next(err);
    }
})

// 添加班级
router.post('/', superAdminAuth, async (req, res, next) => {
    try {
        let {gradeName, major, desc} = req.body;

        let isRequire = await grade.findOne({gradeName, major});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '班级名冲突'
            })
        } else {

            let data = await grade.create({gradeName, major, desc});
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

// 修改班级
router.put('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {gradeName, major, desc} = req.body;

        await grade.updateOne({_id: id}, {$set: {gradeName, major, desc}});
        res.json({
            code: 0,
            msg: '修改成功'
        })

    } catch(err) {
        next(err);
    }
})

// 删除班级
router.delete('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;

        await grade.deleteOne({_id: id});
        res.json({
            code: 0,
            msg: '删除成功'
        })

    } catch(err) {
        next(err);
    }

})

module.exports = router;