const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const Post = require('../models/post')

// create post

router.post('/', (req,res, next)=>{
    const newPost = new Post({
        _id:  mongoose.Types.ObjectId(),
        categoryId: req.body.categoryId,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy,
        created: req.body.created,
        slug: req.body.slug
        

    })
    newPost.save().then(result=>{
        console.log(result);
        res.status(201).json({result})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

    
})

router.get('/',(req, res, next)=>{

    
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
router.patch('/:postId',(req, res, next)=>{
    
    const id = req.params.postId;
    
    Post.updateMany({ _id: id}, {$set: req.body})
    
    .then(result=>{
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})

router.delete('/:postId',(req, res, next)=>{
    
    const id = req.params.postId;
    Post.remove({_id: id}).exec().then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;

