const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacher = new Schema({
username:
    {
        type: String,
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
faculty: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'faculty'
},
superAdmin: Number
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('teacher', teacher);