//load express & path
const express = require('express');
const path = require('path');

const publicFolder = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();

//set public folder
app.use(express.static(publicFolder));

//start server
app.listen(port, () => {
  console.log(`Node JS start at ${port}`);
});

//Message to show that server has started
