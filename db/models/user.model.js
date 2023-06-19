import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true , 
        required : [true , "name is required"] ,
        minLength : [2 , "user name is to short "]
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
        minLength : [2 , "user name is to short "] , 
        unique : [true , 'email must be unique'] 
    } ,
    role : {
        type :String , 
        enum : ['user' , 'admin'], 
        default : 'user'
    },
    createdBy : {
        type : mongoose.Types.ObjectId , 
        ref : "admin"
    } ,
   

} ,{timeStamops:true , toJSON:{virtuals : true } , toObject : {virtuals : true} })




userSchema.virtual("MyTodos" , {
ref : "todo",
localField : "_id" , 
foreignField : "employ"
})


userSchema.pre(/^find/ , function (){
this.populate("MyTodos")
})
export const userModel = mongoose.model('user' , userSchema)