const express = require("express");
const mongoose  = require('mongoose')


const app = express();

// routes
app.get('/',(req,res)=>{
    res.send("Hello Love API")
})

app.listen(3000,()=>{
    console.log("Love Connect API running on 3000");
})