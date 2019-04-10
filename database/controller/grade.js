const router = require('express').Router();
const grade = require('../model/grade');

// 获取所有班级信息
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
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let {pn, size} = req.query;

        let data = await grade.find({major: id})
                .skip((pn - 1) * size)
                .limit(size)
                .sort({_id: -1})
                .populate({
                    path:'major',
                    select: 'majorName faculty',
                    populate: {
                        path: 'faculty',
                        select: 'facultyName'
                    }
                });
        
        let count = await grade.find({major: id}).count();
        res.json({
            code: 0,
            msg: '获取某个专业下的所有班级信息成功',
            data,
            count
        })
        
    } catch(err) {
        next(err);
    }
})

// 添加班级
router.post('/', async (req, res, next) => {
    try {
        let {gradeName, major} = req.body;

        let isRequire = await grade.findOne({gradeName, major});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '班级名冲突'
            })
        } else {

            let data = await grade.create({gradeName, major});
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

// 删除班级
router.delete('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        await grade.deleteOne({_id: id});
        res.json({
            code: 0,
            msg: '删除成功',
        })

    } catch(err) {
        next(err);
    }

})

module.exports = router;