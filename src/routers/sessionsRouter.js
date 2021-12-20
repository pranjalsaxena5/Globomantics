const express = require('express');
const sessionsRouter = express.Router();
const sessions = require('../data/sessions.json')
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb')



sessionsRouter.route('/').get(
    (req, res) => {

        const url = 'mongodb+srv://pranjalsaxena5:himongodb@cluster0.l2jqq.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';


        (async function mongo() {
            let client;
            try {
                console.log('Trying to connect to Mongo DB from sessionsRouter')
                client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
                debug('Connected to the mongo DB');
                console.log('Yes the connection is successful')
                const db = client.db(dbName);
                const sessions = await db.collection('session').find().toArray();
                res.render('sessions', { sessions });

            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }())
    })


sessionsRouter.route('/:id').get((req, res) => {

    const id = req.params.id;
    const url = 'mongodb+srv://pranjalsaxena5:himongodb@cluster0.l2jqq.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';


    (async function mongo() {
        let client;

        try {
            console.log('Trying to connect to Mongo DB from sessionsRouter')
            client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
            debug('Connected to the mongo DB');
            console.log('Yes the connection is successful')
            const db = client.db(dbName);
            const session = await db.collection('session').findOne({ _id: new ObjectID(id) });
            res.render('session', { session});

        } catch (error) {
            debug(error.stack);
        }
        client.close();
    }())
})


module.exports = sessionsRouter;
