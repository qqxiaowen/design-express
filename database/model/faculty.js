const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faculty = new Schema({
    facultyName: String
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('faculty', faculty);