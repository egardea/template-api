require('dotenv').config();
const SmoochCore = require('smooch-core');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8000;
const APP = express()

APP.use(cors());
APP.use(express.json());

APP.get('/templates', function(req, res) {
  let smooch = new SmoochCore({keyId: req.query.keyId, secret: req.query.secret, scope: 'app'});

  smooch.templates.list({
    appId: req.query.appId,
    props: {
      limit: 100
    }
  })
  .then(result => res.send(result))
  .catch(error => res.send(error));
});

APP.post('/create', function(req, res) {
  let smooch = new SmoochCore({keyId: req.query.keyId, secret: req.query.secret, scope: 'app'});

  smooch.templates.create({
      appId: req.query.appId,
      props: req.body
  })
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

APP.delete('/delete', function(req, res) {
  let smooch = new SmoochCore({keyId: req.query.keyId, secret: req.query.secret, scope: 'app'});

  smooch.templates.delete({
      appId: req.query.appId,
      templateId: req.query.templateId
  })
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

APP.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
