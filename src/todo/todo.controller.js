import { todoModel } from "../../db/models/todo.model.js"
import { userModel } from "../../db/models/user.model.js"
import { catchAsyncError } from "../middleWare/erro.Handler/appErorr.js"








const createTodo = catchAsyncError(async(req ,res ,next) =>{
    let {employ} = req.body 

    if (employ) {
        let check = await userModel.findById(employ) 
        if (check) {
            let todo =await new todoModel(req.body)
            let result = todo.save()
                if (todo) {
                  return  res.status(201).json({message : 'success' , todo})

            } else {
                return next(new AppeError ("failed", 406 ))

            }
        }else{
            return next(new AppeError ("employee not found", 406 ))

        }
    }else {
        return next(new AppeError ("Empolyee ID not provided failed is  empty ", 406 ))

    }


}
)
export {createTodo}