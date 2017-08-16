const express = require('express');

const app = express();
app.use('/public', express.static('static'));

app.listen(3000, function() {
  console.log('App started on port 3000');
});
