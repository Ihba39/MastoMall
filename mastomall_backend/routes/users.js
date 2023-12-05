const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getUser, async (req, res) => {
    const isMatch = await res.user.comparePassword(req.body.password)
    if(isMatch){
        res.send(res.user)
    }else{
        res.json({message: "Authentication failed"})
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        cell: req.body.cell,
        password: req.body.password
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null){
        res.user.name = req.body.name
    }
    if (req.body.email != null){
        res.user.email = req.body.email
    }
    if (req.body.password != null){
        res.user.password = req.body.password
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getUser, async (req, res) => {
    try{
        res.user.deleteOne({_id: res.user._id})
        res.json({message: 'Deleted User'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if (user==null){
            return res.status(404).json({message: 'Cannot find user'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router