const searchRouter = require('express').Router();
const searchHelpers = require('../helpers/searchHelpers');
const authentication = require("../helpers/authenticationHelpers");

searchRouter.post('/',
    authentication.readToken,
    searchHelpers.bookSearch,
    (req,res) => {
        if(req.body.success) {
                res.send({
                        success: true,
                        books: req.body.books
                })
        } else {
                res.send({success:false})
        }
});


module.exports = searchRouter;