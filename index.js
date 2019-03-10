const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let host = process.env.HOST == undefined ? '0.0.0.0' : process.env.HOST
let port = process.env.PORT == undefined ? 3000 : process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { recaptchaKey: process.env.RECAPTCHA_SITE_KEY });
})

app.get('/abuse', function(req, res) {
    res.render('legal/abuse');
});

app.get('/notice', function(req, res) {
    res.render('legal/notice');
});

app.get('/privacy', function(req, res) {
    res.render('legal/privacy');
});

app.get('/terms-and-conditions', function(req, res) {
    res.render('legal/terms-and-conditions');
});

app.get('/404', function(req, res) {
    res.render('errors/404');
});

app.post("/contact", function (req, res) {
    console.log(req.body)
    return res.json({ success: true })
});

app.listen(port, host, () => {
  console.log('Application run on ' + host + ':' + port)
})
