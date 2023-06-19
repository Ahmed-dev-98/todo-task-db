import { userModel } from '../../../db/models/user.model.js'
import { todoModel } from '../../../db/models/todo.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppeError, catchAsyncError} from './../erro.Handler/appErorr.js'

const signUp =catchAsyncError( async (req, res, next) => {

    let check = await userModel.find({ email: req.body.email })

    if (check.length >= 1) {
        return next(new AppeError('email already register' , 406)) 
    
        
    } else {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
        req.body.password = hashedPassword
        let added = new userModel(req.body)
        let result = await added.save()
        res.status(201).json({ message: 'success', result })
    }

})


const userSignIn = catchAsyncError(async (req, res, next) => {

    let check = await userModel.findOne({ email: req.body.email })
    if (check) {
        const match = bcrypt.compareSync(req.body.password, check.password)
        if (match) {
            let token = jwt.sign({ name: check.name, userId: check._id, role: check.role }, "crypt")
            res.status(200).json({ message: 'success', token })
        } else {
            next(new AppeError('wrong password' , 401))

        }
    } else {

        next(new AppeError('employee not found' , 404))

    }

}
)








const updateTodo = catchAsyncError(async (req, res, next) => {

    let { id  , body } = req.params
    let check = await todoModel.findByIdAndUpdate({_id:id}, { completed: body }, { new: true })
    if (check) {
        return res.status(200).json({ message: "success", check })
    } else {
        return next(new AppeError ("already deleted ", 406 ))

    }
}

)
const deleteTodo = catchAsyncError(async (req, res, next) => {

    let { id   } = req.params
    let check = await todoModel.findByIdAndDelete({_id:id}, { new: true })
    if (check) {
        return res.status(200).json({ message: "success", check })
    } else {
        return next(new AppeError ("already deleted ", 406 ))

    }
}
)
export { userSignIn, signUp, updateTodo ,deleteTodo }

