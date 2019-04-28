const router = require('express').Router();

const subject = require('../model/subject');

const superAdminAuth = require('./superAdminAuth');

// 获取所有科目信息
router.get('/', async (req, res, next) => {
    try {
        let {pn, size} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);
        let data = await subject.find()
                .skip((pn - 1) * size)
                .limit(size)
                .sort({_id: -1})
        res.json({
            code: 0,
            msg: '获取所有科目信息成功',
            data
        })

    } catch(err) {
        next(err)
    }
})

// 添加科目
router.post('/', superAdminAuth, async (req, res, next) => {
    try {
        let {subjectName, desc} = req.body;

        let isRequire = await subject.findOne({subjectName});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '科目名冲突'
            })
        } else {

            let data = await subject.create({subjectName, desc});
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

// 修改科目
router.put('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {subjectName, desc} = req.body;

        await subject.updateOne({_id: id}, {$set: {subjectName, desc}});
        res.json({
            code: 0,
            msg: '修改成功'
        })

    } catch(err) {
        next(err);
    }
})

// 删除班科目
router.delete('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;

        await subject.deleteOne({_id: id});
        res.json({
            code: 0,
            msg: '删除成功'
        })

    } catch(err) {
        next(err);
    }

})

module.exports = router;