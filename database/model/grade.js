const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grade = new Schema({
    gradeName: String,
    desc: {
        type: String,
        default: '还没有添加简介哟'
    },
    major: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'major'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('grade', grade);