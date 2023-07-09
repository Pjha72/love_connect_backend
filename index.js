const express = require("express");
const mongoose  = require('mongoose')
const User = require('./models/userModel')
const cors = require('cors');
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))

// routes
app.get('/',(req,res)=>{
    res.send("Hello Love API")
})

app.get('/all',(req,res)=>{
    res.send("Hello Love API ALL")
})

// How to get data from the database
app.get('/users', async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/users/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const users = await User.findById(id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Update a user
app.put("/users/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any user in database
        if(!user){
            res.status(404).json({message: `Cannot find the user with ID ${id}`});
        }
        const updateUser = await User.findById(id);
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// Delete a user
app.delete('/users/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `Cannot find any user with id ${id}`});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/user',async (req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

mongoose.set('strictQuery',false);
mongoose
    .connect('mongodb+srv://pjha2186:admin@cluster0.x3ce6um.mongodb.net/love-Connect' || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then(()=>{
        console.log("Connect to mongodb")
        app.listen(3000,()=>{
            console.log("Love Connect API running on 3000");
        })
        
    }).catch((error)=>{
        console.log(error);
    })

