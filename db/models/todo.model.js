import mongoose from "mongoose";


const todoSchema =new mongoose.Schema({
    content : {
        type : String , 
    } ,

    completed : {
        type : Boolean , 
        default : false 
    }  , 

    employ : {
        type : mongoose.Types.ObjectId , 
        ref : 'user',
        required : [ true ,"id is required" ]
    }
})
     


export const todoModel = mongoose.model('todo' , todoSchema)