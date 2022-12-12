require('dotenv').config();
const { Router } = require('express');
const { authenticate } = require('passport');

const router = Router();

router.get('/', authenticate('jwt'), (req, res) => {
  try {
    res.json({message: 'Authorized Token'});
  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong'});
  }

})

module.exports = router;