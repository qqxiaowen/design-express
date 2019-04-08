const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacher = new Schema({
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
desc: String,
sex: Number,
avatar: String,
nicheng: String,
faculty: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'faculty'
}
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('teacher', teacher);