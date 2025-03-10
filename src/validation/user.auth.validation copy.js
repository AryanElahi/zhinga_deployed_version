const joi = require("joi")

const phone = joi.object ({
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$"))
})

const codephone = joi.object ({
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    code : joi.number()
    .min(5)
})
const resetpassval = joi.object ({
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    code : joi.number()
    .min(5),
    password : joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})
const signupVal = joi.object ({
    full_name : joi.string()
    .required(),
    password : joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password : joi.ref("password"),
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    refreshToken : [joi.string(),
    joi.number()],
    Blocked : joi.boolean(),
})
const updateVal = joi.object({
    full_name: joi.string(),
    password: joi.string(),
    phone: joi.string().pattern(
        new RegExp("^(?:\\d{1})?[- .(]*\\d{3}[- .)]*\\d{3}[- .]*\\d{4}$")
    ), 
});
const loginVal = joi.object({
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    password : joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
})


module.exports = { 
    signupVal,
    updateVal,
    loginVal,
    codephone,
    phone,
    resetpassval
}