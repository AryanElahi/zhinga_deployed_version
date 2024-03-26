const joi = require("joi")

const signupVal = joi.object ({
    full_name : joi.string()
    .min(5)
    .required(),
    password : joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password : joi.ref("password"),
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    refreshToken : [joi.string(),
    joi.number()],
    Blocked : joi.boolean(),
    softDelete : joi.boolean()
})




module.exports = { 
    signupVal
}