import express from 'express' 
import cors from 'cors'
import { connection } from './db/connection.js'
import userRouter from './src/user/user.routes.js'
import authRouter from './src/middleWare/auth/auth.routes.js'
import adminAuthRouter from './src/middleWare/adminAuth/admin.auth.routes.js'
import todoRouter from './src/todo/todo.routes.js'
import { globalErrorHandler } from './src/middleWare/erro.Handler/globalErorr.controller.js'
const app = express()
const port = 3000 

process.on("unhandledRejection", (err) => {
})
app.use(express.urlencoded({ extended: true }))


app.use(cors())

app.use(express.json())

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/admin' , adminAuthRouter)
app.use('/api/v1/todo' , todoRouter)

app.all("*", (req, res, next) => {

    next(new AppeError(`cant find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)






connection()
app.listen(process.env.PORT || port ,()=>{console.log('app is runing on port '+port)})