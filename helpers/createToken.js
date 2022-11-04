const jwt = require('jsonwebtoken')

const createUserToken = (user, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, 'edu')

    res.status(200).send({
        msg:'Usuario foi autenticado com sucesso!',
        token: token,
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            id: user._id,
            email: user.email,
            photo: user.perfilPhoto,
            admin: user.admin
        }
    })
}

module.exports = createUserToken