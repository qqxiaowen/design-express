const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subject = new Schema({
    subjectName: String,
    desc: {
        type: String,
        default: '还没有添加简介哟'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('subject', subject);