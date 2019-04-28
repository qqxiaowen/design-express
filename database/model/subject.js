const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subject = new Schema({
    subjectName: String,
    desc: String
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('subject', subject);