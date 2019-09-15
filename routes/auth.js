const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Log in user');
});

router.get('/', (req, res) => {
  res.send('Get Log in User');
});
module.exports = router;
