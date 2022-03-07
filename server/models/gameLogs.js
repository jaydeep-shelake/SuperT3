const mongoose = require('mongoose')

const GameLog = new mongoose.Schema({
    winnerName:{
        type:String,
        required:true
    },
    loserName:{
        type:String,
        required:true
        
    },
    draw:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{
    timestamps:true
})

module.exports= mongoose.model('GameLog',GameLog)