const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Post = require('../models/post')

router.get('',(req, res, next)=>{

    
    Post.find().sort({created: -1})
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
})

router.get('/title',(req, res, next)=>{

    
    Post.find({
        title: req.body.title,
    })
    .then(docs=>{
        const response = {
            count: docs.length
            

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
})

router.get('/content',(req, res, next)=>{

    const regex = new RegExp(req.body.content, 'i')

    
    Post.find({
        content: {$regex:regex},
    })
    .then(docs=>{
        const response = {
            count: docs.length

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
})

router.get('/category',(req, res, next)=>{

    
    Post.find({
        categoryId: req.body.categoryId,
    })
    .then(docs=>{
        const response = {
            count: docs.length
            

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
})

module.exports = router