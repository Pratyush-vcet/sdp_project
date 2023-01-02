const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage')
const express = require('express')


const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        return res.status(200).json(postMessages);

    } catch (error) {
        return res.status(422).json({
            message: "",
            error: error.message,
        });

    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save()
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(409).json({
            message: "",
            error: error.message,
        });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with this id');
        

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json({updatedPost,
    message: 'Post updated'
});

}

const deletePost = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with this id');
    
    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted'})
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
}