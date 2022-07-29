require('./models/db');

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodypaeser = require('body-parser');

const studentsController = require('./controllers/studentsController');

var app = express();
app.use(bodypaeser.urlencoded({
    extended: true
}));
app.use(bodypaeser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', hbs.engine ({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/students', studentsController);

//hello