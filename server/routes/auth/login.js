const { Router } = require('express');
const { auth } = require('../../controllers/controllers.js')

const router = Router();

router.post('/', auth.login)

module.exports = router;