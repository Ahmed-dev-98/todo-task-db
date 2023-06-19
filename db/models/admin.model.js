import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true , 
        required : [true , "name is required"] ,
        minLength : [2 , "admin name is to short "]
    } ,

    password : {
        type : String ,
        required : [true , "name is required"] ,
        minLength : [6 , "password is to short "]
    } ,

    email : {
        type : String ,
        trim : true , 
        required : [true , "name is required"] ,
        minLength : [2 , "admin name is to short "] , 
        unique : [true , 'email must be unique'] 
    } ,
    role : {
        type :String , 

        default : 'admin'
    },

})

export const adminModel = mongoose.model('admin' , adminSchema)