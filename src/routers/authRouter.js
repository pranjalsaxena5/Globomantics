const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient, ObjectID } = require('mongodb')
const passport = require('passport');


const authRouter = express.Router();


authRouter.route('/signUp').post((req, res) => {

    const { username, password } = req.body;
    const url = 'mongodb+srv://pranjalsaxena5:himongodb@cluster0.l2jqq.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function addUser() {
        let client;
        try {
            console.log('Trying to connect to Mongo DB from sessionsRouter')
            client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
            debug("Connected to Mongo DB!");

            const db = client.db(dbName);
            const user = { username, password };
            const results = await db.collection('users').insertOne(user);
            debug(results);
            req.login(results.ops[0], () => {
                res.redirect('/auth/profile');
            })

        }
        catch (err) {
            debug(err);
        }
        client.close();
    }())
})


authRouter
.route('/signIn')
.get((req, res) => {
    res.render('signin');
})
.post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/'
}));
authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
})
module.exports = authRouter