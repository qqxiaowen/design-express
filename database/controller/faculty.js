const router = require('express').Router();

const faculty = require('../model/faculty');
const major = require('../model/major');

const superAdminAuth = require('./superAdminAuth');

// 获取所有院系信息
router.get('/', async (req, res, next) => {
    try {
        
        let data = await faculty.find();
        res.json({
            code: 0,
            msg: '获取所有院系信息成功',
            data,
        })
    } catch(err) {
        next(err);
    }
})

// 获取单个院系信息
router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params;

        let data = await faculty.findById(id);
        res.json({
            code: 0,
            msg: '获取单个院系信息成功',
            data
        })
    } catch(err) {
        next(err);
    }
})

// 添加院系
router.post('/', superAdminAuth, async (req, res, next) => {
    try {
        let {facultyName, desc = '很懒，没有添加简介'} = req.body;
        let isRequire = await faculty.findOne({facultyName, desc});
        if (isRequire) {
            res.json({
                code: 300,
                msg: '已有该院系'
            })
        } else {
            let data = await faculty.create({facultyName, desc});
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

// 修改院系
router.put('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        let {facultyName, desc} = req.body;
        
        await faculty.updateOne({_id: id},{$set: {facultyName, desc}});
        res.json({
            code: 0,
            msg: '修改成功'
        })
    } catch(err) {
        next(err);
    }
})

// 删除院系
router.delete('/:id', superAdminAuth, async (req, res, next) => {
    try {
        let {id} = req.params;
        
        let majorData = await major.findOne({faculty: id});
        if (majorData) {
            res.json({
                code: 300,
                msg: '该院系下还有专业',
            })
        } else {

            await faculty.deleteOne({_id: id});
            res.json({
                code: 0,
                msg: '删除成功',
            })
        }
    } catch(err) {
        next(err);
    }
})

module.exports = router;