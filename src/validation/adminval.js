const joi = require("joi")

const creatval = joi.object ({
    tour3dRequest: joi.bool().optional(),
    tour3dlink : joi.string().optional(),
    loan : joi.number(),
    type : joi.string(),
    region : joi.string(),
    address : joi.string(),
    location : joi.string(),
    usage    : joi.string(),
    document_type : joi.string(),
    land_metrage : joi.number(),
    useful_metrage : joi.number(),
    floor_number : joi.number(),
    floor : joi.number(),
    Unit_in_floor : joi.number(),
    year_of_build : joi.number(),
    full_name : joi.string(),
    price     : joi.number(),
    room_number  : joi.number(),
    features     : joi.string(),
    phone    :joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    state_code:  joi.string(),

})
module.exports = { 
    creatval
}