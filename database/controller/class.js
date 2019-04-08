const router = require('express').Router();
const classTable = require('../model/class');

// 获取所有班级信息
router.get('/', async (req, res, next) => {
    try {
        let {pn, size} = req.query;
        pn = parseInt(pn);
        size = parseInt(size);
        let data = await classTable.find()
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
        res.json({
            code: 0,
            msg: '获取所有班级信息成功',
            data
        })

    } catch(err) {
        next(err)
    }
   
})


module.exports = router;