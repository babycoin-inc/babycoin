const { Router } = require('express');
const { login } =  require('../../controllers/controllers.js').auth;
const { authenticate } = require('passport');

const router = Router();

router.post('/', authenticate('local'), login);

module.exports = router;