const router = require('express').Router();

router.get('/', (req, res) => {
    res.josn({
        code: 200
    })
})

// router.get('/initAddTeacher', async (req, res, next) => {

// })

module.exports = router;