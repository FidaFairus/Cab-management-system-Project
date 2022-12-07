const express = require('express');
const parser = require('body-parser');
const customerRoute = require('./routes/signup')
const driverRoute = require('./routes/driver')
// const bookingRoute = require('./routes/bookingroute')
const path=require ('path')
const cookie = require("cookie-session");
const {engine} = require('express-handlebars');
const auth = require("./middleware/auth")



const app = express();
app.engine('handlebars', engine());
app.set('view engine','handlebars');


app.use(parser.urlencoded({extended: true}));
app.use('/static',express.static(path.join(__dirname,'static')));
app.use(cookie({
    name : "session",
    httpOnly : true,
    keys : ["fidha"],
    maxAge : 24*60*60*1000
}))
app.use(auth.auth);
app.use(customerRoute);
app.use(driverRoute);


app.listen(80)