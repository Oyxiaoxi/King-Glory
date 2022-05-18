const mongoose = require('mongoose')

// 定义模型字段
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
})

module.exports = mongoose.model('Hero', schema)
