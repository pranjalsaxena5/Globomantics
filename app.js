const express = require('express');
// const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path')
const sessionsRouter = express.Router();


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));


sessionsRouter.route('/').get(
    (req, res) => {
        res.render('sessions', {
            sessions: [
                {title: 'Session 1', description: 'This is session 1'},
                {title: 'Session 2', description: 'This is session 2'},
                {title: 'Session 3', description: 'This is session 3'},
                {title: 'Session 4', description: 'This is session 4'}

            ]
        })
    }
)
app.use('/sessions', sessionsRouter);


sessionsRouter.route('/1').get((req, res) => {
    res.send('Hello single sessions');
})

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c']} );
});


app.listen(3400, () => {
    debug("Listening on port 3000");

});