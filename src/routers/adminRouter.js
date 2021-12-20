const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb')
const adminRouter = express.Router();
const sessions = require('../data/sessions.json')


adminRouter.route('/').get((req, res) => {

    const url = 'mongodb+srv://pranjalsaxena5:himongodb@cluster0.l2jqq.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';


    (async function mongo() {
        let client;

        try {
            console.log('Trying to connect to Mongo DB')
            client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true});
            debug('Connected to the mongo DB');
            console.log('Yes the connection is successful')
            const db = client.db(dbName);
            const response = await db.collection('session').insertMany(sessions);
            res.json(response);

        } catch (error) {
            debug(error.stack);
        }
        client.close(); 
    }())

})



module.exports = adminRouter;