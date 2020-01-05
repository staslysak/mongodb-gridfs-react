const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express(); 
const config = require('./config');


mongoose.connect(
  config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', require('./routes/upload'));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`));
