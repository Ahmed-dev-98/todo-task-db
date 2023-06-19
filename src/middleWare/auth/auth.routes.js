
import express from 'express'
import *as authController from './auth.controller.js'
import { protectedRoute } from '../adminAuth/admin.auth.js'

const authRouter = express.Router()

authRouter.post('/signUp' , protectedRoute, authController.signUp)
authRouter.post('/userlogin' ,authController.userSignIn)
authRouter.put('/update/:id/:body' ,authController.updateTodo)
authRouter.delete('/delete/:id' ,authController.deleteTodo)




export default authRouter