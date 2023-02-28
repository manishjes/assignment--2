const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const Category = require('../models/category')

router.post('/', (req,res, next)=>{
    const newCategory = new Category({
        _id:  mongoose.Types.ObjectId(),
        categoryname: req.body.categoryname
        

    })
    newCategory.save().then(result=>{
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
    //  res.status(200).json({
    // message: 'hsndling get request to /product'
    //  })
    Category.find()
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

router.patch('/:categoryId',(req, res, next)=>{
    
    const id = req.params.categoryId;
    
    Category.updateMany({ _id: id}, {$set: req.body})
    
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

router.delete('/:categoryId',(req, res, next)=>{
    
    const id = req.params.categoryId;
    Category.remove({_id: id}).exec().then(result=>{
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
