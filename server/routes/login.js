const loginRouter = require('express').Router();
const pwHelpers = require('../helpers/pwHelpers');
const authentication = require("../helpers/authenticationHelpers");
const userHelpers = require('../helpers/userHelpers');
const searchHelpers = require('../helpers/searchHelpers');

loginRouter.get('/', async (req, res) => {
    res.send('hey');
});

loginRouter.post('/',
    pwHelpers.checkPassword,
    userHelpers.getIdFromEmail,
    authentication.createToken,
    (req,res) => {
    res.send({
        'success': true,
        'token': req.body.new_token,
        'id': req.body.id,
        'email': req.body.email
    });
});

loginRouter.post('/read-token',
    authentication.readToken, async(req,res)=>{
    res.send({'isTokenValid':true, 'email':req.body.email, 'id': req.body.id});
});

loginRouter.post('/logout',
    authentication.destroyToken,
    async (req, res) => {
    res.send({success: true});
});

loginRouter.post('/update-password',
    pwHelpers.hashNewPassword,
    pwHelpers.changePassword,
    async (req, res) => {
    res.send({'updated': true});
});

module.exports = loginRouter;