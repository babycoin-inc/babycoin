require('dotenv').config();
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', (req, res) => {
  try {
    console.log(req.headers.authorization?.split(' '));
    const bearerToken = req.headers.authorization?.split(' '); // ['Bearer', <token>]
    const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;
    if(!bearerToken || !token) {
      res.status(401).json({ message: 'unauthorized' });
      return;
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    res.json({message: 'Authorized Token'});
  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong'});
  }

})

module.exports = router;