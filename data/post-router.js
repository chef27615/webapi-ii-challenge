const express = require('express');

const Posts = require('./db');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved" })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id);

        post.length > 0 ? res.status(200).json(post) : res.status(404).json({ message: "The post with the specified ID does not exist." }) 
        // if(post.length > 0){
        //     res.status(200).json(post);
        // }else{ res.status(404).json({
        //     message: "The post with the specified ID does not exist."
        // }) }
    } catch (err){
        res.status(500).json({ message: "The post information could not be retrieved."})
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        const { title, contents } = req.body;
        if(title&&contents){
            res.status(201).json(post);
        } else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    }catch(err){res.status(500).json({ error: "There was an error while saving the post to the database" })}
})

router.delete('/:id', async (req, res) => {
    try{
        const count = await Posts.remove(req.params.id);
        count > 0 ? res.status(204).end() : res.status(404).json({ message: "The post with the specified ID does not exist." })
    } catch (err){ res.status(500).json({ error: "The post could not be removed" })}
})

router.put('/:id', async (req, res) => {
    try{
        const post = await Posts.update(req.params.id, req.body);
        const {title, contents } =req.body;
        if(post.id&&title&&contents){
            res.status(200).json(post);
        }
        else if(title&&contents){
            res.status(400).json({ message: "The post with the specified ID does not exist." })
        }
        else{
            res.status(404).json({ errorMessage: "Please provide title and contents for the post." })
        }} catch (err){ res.status(500).json({ error: "The post information could not be modified." })}
})

module.exports = router;