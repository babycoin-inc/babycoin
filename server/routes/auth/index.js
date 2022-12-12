const { Router } = require('express');
const loginRouter = require('./login.js');

const router = Router();
router.use('/login', loginRouter);

module.exports = router;