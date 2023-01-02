const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:String,
    message:String,
    selectedFile:String,

    createdAt: {
        type:Date,
        default:new Date()
    },
  })
  
  module.exports = mongoose.model('PostMessage', postSchema)
  