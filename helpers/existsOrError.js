const ObjectId = require('mongoose').Types.ObjectId

const existsOrError = (value, msg) => {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0 ) throw msg
}
const validId = id => {
    if(!ObjectId.isValid(id)) throw 'id invalido!'
 } 

module.exports = {existsOrError, validId}