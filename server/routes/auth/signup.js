const { Router } = require('express');
const { signup } =  require('../../controllers/controllers.js').auth;
const { authenticate } = require('passport');

const router = Router();

router.post('/', signup);

module.exports = router;