require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
//const MONGO_URI = process.env.MONGO_URI;
const jsxEngine = require('jsx-view-engine');
const Fruit = require('./models/fruit.js')
const methodOverride = require('method-override');
const PORT = 3000
mongoose.connect(process.env.MONGO_URI) //process environment



app.use (express.urlencoded({ extended: true })); //enable req.body in form data-used for server side rendered website (send html files)
//app.use(express.json())  //enables req.body in json data-used for api (send raw json data)
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())
app.use(methodOverride('_method'))

mongoose.connection.once('open', () => {
    console.log(`MongoDB is rockin', hit me with your best data`)
});

mongoose.connection.on('error', () => {
    console.log(`You know how Mongo be trippin'`)
});

//INDUCES

//INDEX

app.get('/fruits', async (req, res) => {
    try{
       const foundFruits = await Fruit.find({})
       res.render('fruits/Index', {
           fruits: foundFruits
       })
    } catch (error) {
       res.status(400).send ({ msg: error.message })
    }
});

//NEw
// show user form used to create new entry

app.get('/fruits/new', (req, res) => {  // needs / at beginning
    res.render('fruits/New') // needs capitol letter
});

//DELETE

app.delete('/fruits/:id', async (req, res) => {
    try {
        await Fruit.findOneAndDelete({ _id: req.params.id })
        .then((fruit) => {
            res.redirect('/fruits')
        })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
});

//CREATE

app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on') {  // messaging the data
        req.body.readyToEat = true 
    } else {
        req.body.readyToEat = false
    }
    try {
        const createdFruit = await Fruit.create(req.body)
        res.redirect(`/fruits/${createdFruit._id}`)
    } catch (error) {
    res.status(400).send({msg: error.message})
    }
});

//EDIT--UPDATE

app.get('/fruits/:id/edit', async (req, res) => {
    try {
        const foundFruit = await Fruit.findOne({_id: req.params.id});
        res.render('fruits/Edit', {
            fruit: foundFruit
        });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});

app.put('/fruits/:id', async (req, res) => {
       try {
        if(req.body.readyToEat === 'on') {  
            req.body.readyToEat = true
       } else {   
            req.body.readyToEat = false}
           const updatedFruit = await Fruit.findOneAndUpdate({ _id: req.params.id}, req.body, {new : true})
           res.redirect(`/fruits/${updatedFruit._id}`)
       } catch (error) {
           res.status(400).send({ msg: error.message })
       }    
});

//SHOW

app.get('/fruits/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findOne({_id: req.params.id})
        res.render('fruits/Show', {
            fruit: foundFruit
        })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
});


app.listen(PORT, () => {
    console.log(`The PORT at ${PORT} is lit`)
});