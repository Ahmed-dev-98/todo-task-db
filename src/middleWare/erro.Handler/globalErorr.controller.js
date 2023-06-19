

const errorHandller = (res, err , message ) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: message 
    })
}




export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "server error"

// duplicate input error
    if (err.code === 11000) {
        errorHandller(res, err ,`inputed value : /${err.keyValue.name ||err.keyValue.title }/ is already used , please use another one ` )
    }

// wrong id params error 
    else if (err.name === "CastError") {
        errorHandller(res, err ,  `wrong /${err.path}/ value`)
    }


    // validation errors / 
    else {
        errorHandller(res , err ,  err.message  )
    }

}

//Object.values(obj)[0]
