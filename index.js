require('dotenv').config();
const { default: axios } = require('axios');
const SmoochCore = require('smooch-core');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8000;
const APP = express()
let appId = null;
let smooch;

APP.use(cors());
APP.use(express.json());

APP.post('/', function(req, res) {
  appId = req.body.appId;
  smooch = new SmoochCore({keyId: req.body.key, secret: req.body.secret, scope: 'app'});
});

APP.get('/templates', function(req, res) {
  smooch.templates.list({
    appId: appId,
    props: {
      limit: 100
    }
  })
  .then(result => res.send(result))
  .catch(error => res.send(error));
});

APP.post('/create', function(req, res) {
    smooch.templates.create({
      appId: appId,
      props: req.body
    })
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

APP.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
