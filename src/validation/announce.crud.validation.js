const joi = require("joi")

const creat = joi.object ({
    loan : joi.number().required(),
    loan_amount : joi.number(),
    type : joi.string().required(),
    region : joi.string().required(),
    address : joi.string().required(),
    location : joi.string().required(),
    usage    : joi.string().required(),
    document_type : joi.string().required(),
    land_metrage : joi.number().required(),
    useful_metrage : joi.number().required(),
    floor_number : joi.number().required(),
    floor : joi.number().required(),
    Unit_in_floor : joi.number().required(),
    year_of_build : joi.number().required(),
    full_name : joi.string().required(),
    price     : joi.number().required(),
    room_number  : joi.number().required(),
    features     : joi.string().required()
})
const update = joi.object ({
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
    state_code : joi.string(),
    Uid : joi.string()
})
module.exports = { 
    creat, 
    update
}