import express from 'express' 
import * as userController from './user.controller.js'
import { protectedRoute } from '../middleWare/adminAuth/admin.auth.js'
const userRouter = express.Router()

userRouter.get('/' , userController.getUsers)
userRouter.get('/:id' , userController.getUserById)

// create users

userRouter.post('/' , userController.createUser)


// update users 
userRouter.put('/:id' , protectedRoute,userController.updateUser)



//delete users 
userRouter.delete('/:id' , protectedRoute , userController.deleteUser)

userRouter.post ('/:id' , userController.createTodo)


//create todo for users  



// create group














export default userRouter