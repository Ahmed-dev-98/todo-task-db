
import express from 'express'
import * as adminController from './admin.auth.js'

const adminAuthRouter = express.Router()



adminAuthRouter.post('/login' ,adminController.adminSignIn)
adminAuthRouter.post('/create' ,adminController.createAdmin)
adminAuthRouter.post('/' , adminController.protectedRoute ,adminController.createAdmin)


export default adminAuthRouter   