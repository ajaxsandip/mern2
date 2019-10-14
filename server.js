const express = require('express');
const connectdb = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;
connectdb();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('hey ya');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log('listening to ' + PORT);
});
