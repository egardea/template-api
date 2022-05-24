const SunshineConversationsApi = require('sunshine-conversations-client');
const Axios = require('axios');
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');

const defaultClient = SunshineConversationsApi.ApiClient.instance;
const basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'app_626961d7213c3200f315d071	'; // e.g. 'app_5deaa3531c7f940010cc4ba4'
basicAuth.password = 'vbDY1lAAQKuK27Y2fBbD1y8nP1g77UPLK1FH1jOsLoUe2ar953awwZGYroFJQQim01KXFOJ7kfIvVArr-6Uwow'; // e.g. 'tHyBAxPQIX_8CQNEefdc8L8B'

const apiInstance = new SunshineConversationsApi.MessagesApi();
const port = process.env.PORT || 8000;
const APP = express()

APP.use(cors());

APP.get('/templates', function(req, res) {
    axios('https://api.smooch.io/v1.1/apps/624ef518381a1400f3c59ec7/templates', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Basic YXBwXzYyNjk2MWQ3MjEzYzMyMDBmMzE1ZDA3MTp2YkRZMWxBQVFLdUsyN1kyZkJiRDF5OG5QMWc3N1VQTEsxRkgxak9zTG9VZTJhcjk1M2F3d1pHWXJvRkpRUWltMDFLWEZPSjdrZkl2VkFyci02VXdvdw=="
        },
        redirect: 'follow'
    })
        .then(result => res.send(result.data.templates))
        .catch(error => console.log('error', error));
});

APP.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
