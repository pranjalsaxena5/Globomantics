const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const app = express();
const path = require('path')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')


const authRouter = require('./src/routers/authRouter');
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));


app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'globomantics'}));

require('./src/config/passport.js')(app);
app.use('/auth', authRouter)




app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c'] });
});


app.listen(3600, () => {
    debug("Listening on port 3000");

});