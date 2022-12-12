const { Router } = require('express');
const appRouter = require('./app/index.js');
const authRouter = require('./auth/index.js');

const router = Router();

router.use('/', appRouter);
router.use('/auth', authRouter);

module.exports = router;