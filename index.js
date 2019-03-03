const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var fs = require('fs')
var logger = require("morgan");
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var nconf = require('nconf');
var auth =  require('./config.json');

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
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

// http POST /contact
app.post("/contact", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var company = req.body.company;
  var comment = req.body.message;
  var isError = false;

  if (company) {
    isError = true;
  }
  console.log('\nCONTACT FORM DATA: NOM: '+ name + ' EMAIL: '+email + ' MESSAGE: '+ comment+'\n');

  // create transporter object capable of sending email using the default SMTP transport
  var transporter = nodemailer.createTransport(mg(auth));

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Thingmill B0T" <contactform@thingmill.fr>', // sender address
    to: 'Thingmill Corporation, contact@thingmill.fr', // list of receivers
    subject: 'Message provenant du site', // Subject line
    text: 'Bonjour,' + "\n" + 'Vous avez reçu un message du site thingmill.fr' + "\n \n" + 'Prénom/Nom : ' + name + "\n" + 'Entreprise: ' + company + "\n" + 'Email: ' + email + "\n \n" + 'Message: ' + "\n" + comment + "\n \n" + "(c) THINGMILL Corp. 2018 - All rights reserved.",
    err: isError

  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('\nERROR: ' + error+'\n');
      //   res.json({ yo: 'error' });
    } else {
         console.log('\nRESPONSE SENT: ' + info.response+'\n');
      //   res.json({ yo: info.response });
    }
  });
});

app.listen(3000, function () {
  console.log("L'application run sur le port 3000!")
})
