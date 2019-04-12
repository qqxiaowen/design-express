const teacher = require('../model/teacher');
module.exports = function(req, res, next) {
    if(req.session && req.session.user){
        //登录后
        let id = req.session.user._id;
        console.log('session:     ',req.session.user)
        teacher.findById(id).then( data => {
            if (data) { 
                //管理员登录
                next();
            } else {
                res.json({
                    code: 300,
                    msg: '权限不足'
                })
            }
        })
    }else{
        res.json({
            code: 401,
            msg: '登录状态失效'
        })
    }
}