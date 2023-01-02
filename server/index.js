// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const postRouter = require('./routes/posts')

dotenv.config()
mongoose.connect(process.env.CONNECTION_URL, (error) => {
    if (error) {
      console.log('database connection failed')
      throw error
    }
    console.log('database connected')
  })
const app = express();

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log('error', error)
    }
    console.log('Server running on : ' + process.env.PORT)
})

app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
app.use(cors());

app.use('/posts', postRouter)