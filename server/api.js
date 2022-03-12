const express = require('express');
const apiRouter = express.Router();


const loginRouter = require('./routes/login');
apiRouter.use('/login',loginRouter);

const registerRouter = require('./routes/register');
apiRouter.use('/register',registerRouter);

const searchRouter = require('./routes/search');
apiRouter.use('/search',searchRouter);

module.exports = apiRouter;