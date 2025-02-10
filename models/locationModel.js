const mongoose=require('mongoose');

// below we are defing the location schema
const locationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        unique:true,
    },
    linkId:{
        type:String,
        required:true,
        unique:true
    },
    lat: {
        type: Number,
        default: null, 
    },
    lng: {
        type: Number,
        default: null, 
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
      }
})

const location=mongoose.model('Location',locationSchema);
module.exports = location;