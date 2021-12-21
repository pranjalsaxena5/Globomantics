const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy')

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {

        const url = 'mongodb+srv://pranjalsaxena5:himongodb@cluster0.l2jqq.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';
        (async function validateUser() {
            let client;
            try {
                // console.log('Trying to connect to Mongo DB from local.strategy.js')
                client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
                debug("Connected to Mongo DB!");

                const db = client.db(dbName);
                // debug("Collected Db Name");
                const user = await db.collection('users').findOne({ username });
                // debug("Collected data from Mongo DB!");

                if (user && user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }

            } catch (err) {
                done(error, false);
            }
            client.close();
        }())


    }

    ));
};