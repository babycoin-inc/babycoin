const login = (req, res) => {
  console.log('REQ.USER', req.user)
  const authorizedUser = {
    id: req.user.id,
    username: req.user.username
  };
  res.status(200).send(authorizedUser);
}

module.exports = login;
