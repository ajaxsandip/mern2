const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Contacts Added');
});

router.get('/', (req, res) => {
  res.send('Get Contacts');
});
router.put('/:id', (req, res) => {
  res.send('Update Contacts');
});
router.delete('/:id', (req, res) => {
  res.send('Delete Contacts');
});

module.exports = router;
