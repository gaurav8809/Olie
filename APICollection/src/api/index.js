const express = require('express');

const apiRouter = express.Router();

apiRouter.use('/auth', require('./routes/auth'));
apiRouter.use('/user', require('./routes/user'));
apiRouter.use('/badge', require('./routes/badge'));

module.exports = apiRouter;
