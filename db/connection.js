import mongoose from "mongoose";


export const connection = ()=>{
    mongoose.set("strictQuery" , true) 
    mongoose.connect("mongodb+srv://ahmedhassan:ahmed123@cluster0.xbz29sp.mongodb.net/").then(

        console.log('connected to mongoDB')
    ).catch(err => {console.log(err)})
}