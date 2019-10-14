const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, resp, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json('No Token, Authentication Failed');
  }

  jwt.verify(token, config.get('secret'), (err, decoded) => {
    if (err) {
      return resp.json(' Authentication Failed');
    }
    req.user = decoded.user;
    next();
  });
  // .catch(err => {
  //   console.log(err);
  // });
  // .then(decoded => {
  //   req.user = decoded.user;
  //   next();
  // })
  // .catch(err => {
  //   console.log(err);
  // });
};
