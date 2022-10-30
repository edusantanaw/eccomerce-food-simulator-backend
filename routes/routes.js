const { createUser, signin } = require('../controllers/user/UserController')

const router = require('express').Router()  

router.post('/newUser', createUser)
router.post('/signin', signin)

module.exports = router