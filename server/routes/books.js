const booksRouter = require('express').Router();
const authentication = require("../helpers/authenticationHelpers");
const bookHelpers = require('../helpers/bookHelpers');

booksRouter.post('/create',
    authentication.readToken,
    bookHelpers.createPlan,
    (req,res)=> {
    res.send({
        success: true,
        plan: req.body.plan,
        book: req.body.book
    })
});

booksRouter.post('/save',
    authentication.readToken,
    bookHelpers.savePlan,
    (req,res,next)=> {
    res.send({
        success: true
    })
})

module.exports = booksRouter;