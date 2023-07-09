const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please Enter Your Name"]
        },
        age:{
            type: Number,
            required: true,
            default : 0
        },
        gender:{
            type:String,
            required: [true, "Please Specifiy Your Gender"]
        },
        location:{
            type: String,
            required: [true, "Please Specifiy Your Location"]
        },
        interests:{
            type: String,
            required: [true, "Please Specifiy Your Interests"]
        },
        about:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;