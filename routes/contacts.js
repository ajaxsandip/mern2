const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

router.post(
  '/',
  [
    auth,
    check('name', 'Please enter Name')
      .not()
      .isEmpty(),
    check('email', 'Please Enter Email').isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    let contact1 = new Contact({
      name: name,
      email: email,
      phone: phone,
      type: type,
      user: req.user.id
    });
    contact1.save();
    return res.status(202).json(contact1);
  }
);

router.get('/', auth, (req, res) => {
  Contact.find({ user: req.user.id })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json('Authentication Failed');
    });
});
router.put('/:id', (req, res) => {
  console.log('laiilla', req.params.id, { $set: req.body });
  // const idi = mongoose.Types.ObjectId(req.params.id);
  // console.log(idi);
  Contact.findByIdAndUpdate(req.params.id.slice(1), { $set: req.body })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      console.log(err);
      res.json('Authentication Failed');
    });
});
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Contact.findByIdAndRemove(req.params.id)
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.json('Authentication Failed');
    });
});

module.exports = router;
