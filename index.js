const express = require('express')
const app = express()
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

app.listen(3000, function () {
  console.log("L'application run sur le port 3000!")
})
