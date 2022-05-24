require('dotenv').config();
const SunshineConversationsApi = require('sunshine-conversations-client');
const Axios = require('axios');
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');
const defaultClient = SunshineConversationsApi.ApiClient.instance;
const basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = process.env.USERNAME; // e.g. 'app_5deaa3531c7f940010cc4ba4'
basicAuth.password = process.env.PASSWORD; // e.g. 'tHyBAxPQIX_8CQNEefdc8L8B'

const apiInstance = new SunshineConversationsApi.MessagesApi();
const port = process.env.PORT || 8000;
const APP = express()

APP.use(cors());

APP.get('/templates', function(req, res) {
    axios('https://api.smooch.io/v1.1/apps/624ef518381a1400f3c59ec7/templates', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Basic ${process.env.BEARER_TOKEN}`
        },
        redirect: 'follow'
    })
        .then(result => res.send(result.data.templates))
        .catch(error => console.log('error', error));
});

APP.listen(port, () => {
    console.log(`Listening on port ${port}`);
});