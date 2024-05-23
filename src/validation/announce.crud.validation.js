const joi = require("joi")

const creat = joi.object ({
    type : joi.string()
    .min(3)
    .required(),
    region : joi.string(),
    address : joi.string(),
    location : joi.string(),
    usage : joi.string(),
    document_type : joi.string(),
    land_metrage : joi.int(),
    useful_metrage : joi.int(),
    floor_number : joi.int(),
    floor : joi.Int(),
    Unit_in_floor : joi.Int(),
    year_of_build : joi.Int(),
    full_name : joi.string(),
    phone : joi.string(),
    price : joi.Float(),
    room_number : joi.Int(),
    features : joi.string(),
    check : joi.boolean(),
    softDelete : joi.boolean(),
})

module.exports = { 
    creat
}