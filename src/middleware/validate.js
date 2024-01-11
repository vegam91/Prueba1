const { validationResult } = require("express-validator");

const validate = async(req,res,next)=>{
  const errors = validationResult(req);

  if (!errors.isEmpty()){
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
 
}

  next();
};

module.exports= validate