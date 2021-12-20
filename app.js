const express = require('express');
// const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path')
const sessionsRouter = require('./src/routers/sessionsRouter');
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));


app.use('/sessions', sessionsRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c'] });
});


app.listen(3400, () => {
    debug("Listening on port 3000");

});