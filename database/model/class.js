const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classTable = new Schema({
    className: String,
    major: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'major'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('classTable', classTable);