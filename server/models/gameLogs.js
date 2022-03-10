const mongoose = require('mongoose')

const GameLog = new mongoose.Schema({
    currenPlayer:{
        name:{
        type:String,
            required:true
        },
        winner:{
            type:Boolean,
            required:true
            
        }
        
    },
    opponent:{
        name:{
            type:String,
            required:true
            },
            winner:{
                type:Boolean,
            required:true
                
            }
    },
    draw:{
        type:Boolean,
        required:true
    },
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{
    timestamps:true
})

module.exports= mongoose.model('GameLog',GameLog)