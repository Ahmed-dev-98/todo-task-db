

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { adminModel } from '../../../db/models/admin.model.js'
import { todoModel } from '../../../db/models/todo.model.js'
import { catchAsyncError } from '../erro.Handler/appErorr.js'
import { AppeError } from '../erro.Handler/appErorr.js'


////////////////// need to handle wrong token

const protectedRoute = catchAsyncError(async(req,res,next) =>{
    let {token} = req.headers 
    if(token) {
        let decoded = jwt.verify(token , 'crypt') 
        let isUser = await adminModel.findById(decoded.adminId) 
        if(isUser) {
            if(isUser.role === 'admin'){
                req.isUser = isUser
                next()
            } else {   return  new AppeError('u are not authorized',401)  }
        }
    }else{
        return next( new AppeError('invalid token please login',401) ) 
    }
}
)
const createAdmin = catchAsyncError(async (req,res,next) =>{
    let check = await adminModel.find({email:req.body.email}) 
    if(check.length >=1) {
    return next( new AppeError('email already used',401) ) 
    } else {
        let hashedPassword = bcrypt.hashSync(req.body.password , 8)
        req.body.password = hashedPassword
        let added = await new adminModel (req.body)
    let result= added.save()
    res.status(201).json({message : 'success' , added}) 
 
    }

}
)

const adminSignIn = catchAsyncError(async (req, res, next) => {

    let check = await adminModel.findOne({ email: req.body.email })
    if (check) {
        const match =  bcrypt.compareSync(req.body.password, check.password)
        if (match) {
            let token = jwt.sign({ name: check.name, adminId: check._id, role: check.role }, "crypt")
            res.status(201).json({ message: 'success', token })
        } else {
            next(new AppeError('wrong password' , 401))

        }
    } else {

        next(new AppeError('admin not found please register' , 401))

    }

}
)




export{protectedRoute , adminSignIn , createAdmin , }

