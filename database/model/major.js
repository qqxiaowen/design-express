const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const major = new Schema({
    majorName: String,
    faculty: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'faculty'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('major', major);