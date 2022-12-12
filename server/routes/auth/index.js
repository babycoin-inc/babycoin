const { Router } = require('express');
const loginRouter = require('./login.js');
const signupRouter = require('./signup.js');

const router = Router();
router.use('/login', loginRouter);
router.use('/signup', signupRouter)

module.exports = router;