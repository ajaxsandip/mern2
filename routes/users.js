const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('User Registered');
});

router.get('/', (req, res) => {
  res.send('User Retrieved');
});
module.exports = router;
