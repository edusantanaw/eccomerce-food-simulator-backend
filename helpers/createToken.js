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
            name: user.name,
            id: user._id,
            email: user.email
        }
    })
}

module.exports = createUserToken