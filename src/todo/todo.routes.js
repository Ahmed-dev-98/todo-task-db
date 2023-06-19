
import express from 'express' 
import { createTodo } from './todo.controller.js'
const todoRouter = express.Router()



todoRouter.post('/' , createTodo)









export default todoRouter