const jwt = require('jsonwebtoken')

const getToken = require("../helpers/getToken")
const User = require('../models/user')

const isAdmin = async (req, res, next) => {
    const token = getToken(req)
    try{
       
        if(!token) throw 'Acesso rejeitado!'
        const decoded = jwt.verify(token, "edu")
        const id = decoded.id
        const user = await User.findOne({_id: id})
        if(!user) throw  'Acesso rejeitado!'
        if(!user.admin) throw 'Acesso rejeitado'
        next()
    }catch(error){
        res.status(400).send({error: error})
    }
    return
}

module.exports = isAdmin