import { userModel } from "../../db/models/user.model.js"
import {todoModel} from '../../db/models/todo.model.js'
import bcrypt from 'bcrypt'
import { AppeError, catchAsyncError } from "../middleWare/erro.Handler/appErorr.js"

const getUsers = async (req,res,next) =>{
    let check = await userModel.find() 
    if(check.length >=1) {
    return res.status(201).json({message : 'success' , check}) 

    } else {
    res.status(201).json({message : 'no users yet' , check}) 
 
    }

}




export const getUserById = async (req,res,next) =>{

    let {id} = req.params
    let check = await todoModel.find({employ :id}) 
    if(check.length >=1) {
    return res.status(200).json({message : 'success' , check}) 

    } else {
    res.status(200).json({message : 'no users yet' , check}) 
 
    }

}








const createUser = catchAsyncError(async (req,res,next) =>{
    let check = await userModel.find({email:req.body.email}) 
    if(check.length >=1) {
     next(new AppeError('Email already used' , 406 ))
    } else {
        let hashedPassword = bcrypt.hashSync(req.body.password , 8)
        req.body.password = hashedPassword
        req.body.createdBy = req.user._id
        let added = await new userModel (req.body)
    let result= added.save()
    res.status(201).json({message : 'success' , added}) 
 
    }

}
)
const updateUser = catchAsyncError(async (req,res,next) =>{
    let {id} = req.params
    let check = await userModel.findByIdAndUpdate(id , req.body , {new : true})
    if(check) {
    return  res.json({message : 'sucess' , check })
    } else {
    return next(new AppeError('Employee not found',404)) 
    } 

})

const deleteUser =catchAsyncError( async (req,res,next) =>{
    let {id} = req.params
    let check = await userModel.findByIdAndDelete(id)
    if(check) {
    return  res.json({message : 'sucess' , check })
    } else {
        return next(new AppeError('Employee not found',404)) 

    }

}
)
const createTodo = catchAsyncError(async (req,res ,next) => {
    let {id} = req.params 

        let todo =await new todoModel({employ:id , content : req.body.content})
        let result = todo.save()
        if (todo) {
            res.status(200).json({message : "success" , todo})
        } else {
            return next(new AppeError('failed',406)) 
            
        }
    


}

)







export {createUser , updateUser , deleteUser , getUsers , createTodo }