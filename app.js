const express = require('express');
// const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path')
const sessionsRouter = express.Router();
const sessions = require('./src/data/sessions.json')

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));


sessionsRouter.route('/').get(
    (req, res) => {
        res.render('sessions', {
            sessions
        })
    }
)
app.use('/sessions', sessionsRouter);


sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    // res.send('Hello from single session ' + id);
    res.render('session', {
        session: sessions[id],
    })
})

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c'] });
});


app.listen(3400, () => {
    debug("Listening on port 3000");

});