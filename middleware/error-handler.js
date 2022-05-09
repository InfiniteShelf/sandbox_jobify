const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg:        err.message || 'Something went wrong,try again later',
  };
  
  // ### For errors thrown automatically by ExpressJS/Mongoose by throwing
  // built in Error class.
  if (err.name === 'ValidationError') { // If some fields are missing
    defaultError.statusCode = 400;
    defaultError.msg        = Object.values(err.errors)
                                    .map(item => item.message)
                                    .join(' - ');
    // defaultError.msg        = err.message;
    // defaultError.msg = Object.values(err.errors);
    
    // Example on how the response object looks like:
    /* // "err": {
     //   "errors": {
     //     "email": {
     //       "name": "ValidatorError",
     //         "message": "Please provide email",
     //         "properties": {
     //         "message": "Please provide email",
     //           "type": "required",
     //           "path": "email"
     //       },
     //       "kind": "required",
     //         "path": "email"
     //     }
     //   },
     //   "_message": "User validation failed",
     //     "name": "ValidationError",
     //     "message": "User validation failed: email: Please provide email"
     // }*/
  }
  
  if (err.code && err.code === 11000) { // if for example an email already exists
    defaultError.statusCode = 400;
    const fieldName         = Object.keys(err.keyValue)[0];
    defaultError.msg        = `Field ${ fieldName } has to be unique`;
    
    // Example on how the response object looks like:
    /* // "err": {
     //   "index": 0,
     //     "code": 11000,
     //     "keyPattern": {
     //     "email": 1
     //   },
     //   "keyValue": {
     //     "email": "manasijevic.bora@gmail.com"
     //   }
     // }*/
  }
  
  return res.status(defaultError.statusCode).json({msg: defaultError.msg});
  // return res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;