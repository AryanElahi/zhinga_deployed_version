const joi = require("joi")

const request = joi.object ({
    full_name : joi.string(),
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    region : joi.string(),
    type : joi.string()
    .min(3)
    .required(),
    lowest_price : joi.number(),
    hieghest_price : joi.number(),
    location : joi.string(),
    message : joi.string().optional()
})
module.exports = { 
    request
}