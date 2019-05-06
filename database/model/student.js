const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student = new Schema({
username:
    {
        type: String,
        unique: true,
        require: true
    },
numId:
    {
        type: String,
        unique: true,
        require: true
    },
password: String,
desc: {
    type: String,
    default: '还没有添加简介哟'
},
sex: Number,
avatar: String,
grade: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'grade'
}
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('student', student);