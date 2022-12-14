const express = require('express');
const app = express();
const cors = require('cors');
const port = 8081;
const bodyParser = require('body-parser');
const { Connection } = require('./postgres');

Connection.open();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

let allowOrigin = '{URL_PRODUCTION}'
if (process.env.NODE_ENV === "dev")
  allowOrigin = "*"

  console.log(allowOrigin);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin',allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(__dirname));
app.use(express.json());
require('./routes')(app);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})