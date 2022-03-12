const registerRouter = require('express').Router();
const userHelpers = require('../helpers/userHelpers');
const pwHelpers = require('../helpers/pwHelpers');

registerRouter.get('/',
    async (req,res) => {
        res.send('register')
})

registerRouter.post('/',
    pwHelpers.hashNewPassword,
    userHelpers.isEmailValid,
    userHelpers.isEmailAvailable,
    userHelpers.addNewUserToDb,
    pwHelpers.changePassword,
    async (req, res) => {
        res.send(req.body);
})

module.exports = registerRouter;