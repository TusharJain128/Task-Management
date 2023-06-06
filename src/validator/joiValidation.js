const Joi = require('joi')

//---------------------------------Create User-------------------------------------->

exports.createUserJoi = Joi.object({

    firstName: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid first name"),

    lastName: Joi.string().trim().required().regex(/^[a-zA-Z ]+$/).message("please provide valid last name"),

    email:Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    password:Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one lower case one special character and one numerical value"),

    mobile:Joi.string().trim().required().regex(/^[5-9]{1}[0-9]{9}$/).message("please enter valid mobile number")

})

//---------------------------------Login User-------------------------------------->

exports.loginJoi=Joi.object({

    email:Joi.string().trim().required().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),
    
    password:Joi.string().trim().required().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one lower case one special character and one numerical value")
})

//---------------------------------Update User-------------------------------------->

exports.updateUserJoi = Joi.object({

    firstName: Joi.string().trim().regex(/^[a-zA-Z ]+$/).message("please provide valid first name"),

    lastName: Joi.string().trim().regex(/^[a-zA-Z ]+$/).message("please provide valid last name"),

    email:Joi.string().trim().regex(/^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1,}[A-Za-z.]{2,8}$/).message("please enter valid email"),

    password:Joi.string().trim().min(8).max(15).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).message("password must contain one lower case one special character and one numerical value"),

    mobile:Joi.string().trim().regex(/^[5-9]{1}[0-9]{9}$/).message("please enter valid mobile number")

})