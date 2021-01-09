const { Schema } = require("mongoose");

const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
   
    
    age:{
        type:Number,
        required:true,
        
    },
    favoriteFoods:{
        type:Array,
        required:true,
        created_at: {
            type: Date,
            default: Date.now,
          },
    },
});

//Export the model
module.exports = mongoose.model('person', personSchema);