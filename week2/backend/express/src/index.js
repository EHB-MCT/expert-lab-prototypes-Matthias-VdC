const express = require('express');
const handlebars = require('express-handlebars');
const helmet = require("helmet");
const compression = require('compression');

const app = express();


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(helmet());
app.use(compression()); // compress all responses (faster load times)

app.disable('x-powered-by');


app.get('/', async (req, res, next) => {
    res.render('home');
});

app.post('/category/create', async (req, res, next) => {
    Category.create()
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', async (req, res, next) => {
    // respond with html page
    if (req.accepts('html')) {
        res.render('error', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});


app.listen(3000);