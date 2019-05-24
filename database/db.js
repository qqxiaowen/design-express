const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/design', {useNewUrlParser: true});

const db = mongoose.connection;

const location = require('./model/location');

db.on('error', console.error.bind(console, '链接失败'));

db.once('open', function() {
    console.log('连接数据库成功');
    location.remove().then(res => {
        console.log('刪除成功: ', res);
    })
});

module.exports = db;