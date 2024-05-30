const joi = require("joi")
const { check } = require("prisma")

const creat = joi.object ({
    state_code: joi.number().integer(),
    type : joi.string()
    .min(3)
    .required(),
    region : joi.string(),
    address : joi.string(),
    location : joi.string(),
    usage : joi.string(),
    document_type : joi.string(),
    land_metrage : joi.number().integer(),
    useful_metrage : joi.number().integer(),
    floor_number : joi.number().integer(),
    floor : joi.number().integer(),
    Unit_in_floor : joi.number().integer(),
    year_of_build : joi.number().integer(),
    full_name : joi.string(),
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    price : joi.number(),
    room_number : joi.number().integer(),
    features : joi.string(),
})
const update = joi.object ({
    type : joi.string()
    .min(3)
    .required(),
    region : joi.string(),
    address : joi.string(),
    location : joi.string(),
    usage : joi.string(),
    document_type : joi.string(),
    land_metrage : joi.number().integer(),
    useful_metrage : joi.number().integer(),
    floor_number : joi.number().integer(),
    floor : joi.number().integer(),
    Unit_in_floor : joi.number().integer(),
    year_of_build : joi.number().integer(),
    full_name : joi.string(),
    phone : joi.string()
    .pattern(RegExp("^(?:([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$")),
    price : joi.number(),
    room_number : joi.number().integer(),
    features : joi.string(),
    content: joi.any().optional(),
    content: joi.any().optional(),
    check : joi.boolean(),
    softDelete : joi.boolean(),
    state_code : joi.string(),
    Uid : joi.string()
})
module.exports = { 
    creat, 
    update
}