const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const axios = require('axios')
const querystring = require('querystring')
const hookcord = require('hookcord')
const gravatar = require('gravatar')

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
dotenv.config()
const app = express()

app.use(cookieParser('secretString'));
app.use(session({ 
    secret: 'secretString', 
    saveUninitialized: true, 
    resave: true
}));
app.use(flash());


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const {
    check,
    validationResult
} = require('express-validator');

let host = process.env.HOST == undefined ? '0.0.0.0' : process.env.HOST
let port = process.env.PORT == undefined ? 3000 : process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('public'));

const startYear = 2018;

app.use((req, res, next) => {
    res.locals.startYear = startYear;
    res.locals.currentYear = new Date().getFullYear();
    next();
});

app.get('/', function (req, res) {

    function getAgeFromDate(year, month, day) {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day); // mois 0-indexé

        let age = today.getFullYear() - birthDate.getFullYear();

        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassed) {
            age--;
        }

        return age;
    }

    res.render('index', {
        recaptchaKey: process.env.RECAPTCHA_PUBLIC,
        recaptcha: '',
        messages: req.flash(),
        getAge: getAgeFromDate,
    });
});

app.get('/abuse', function (req, res) {
    res.render('legal/abuse', {
        recaptchaKey: process.env.RECAPTCHA_PUBLIC,
        recaptcha: '',
        messages: req.flash()
    });
})

app.get('/notice', function (req, res) {
    res.render('legal/notice');
});

app.get('/privacy', function (req, res) {
    res.render('legal/privacy');
});

app.get('/terms', function (req, res) {
    res.render('legal/terms');
});

app.get('*', function (req, res) {
    res.render('errors/404');
});

// ABUSE SECTION //

app.post("/abuse_contact", [
    check('abuse').exists().withMessage('Le type d\'abus est requis').isLength({min: 2, max: 255}).withMessage('Le type d\'abus doit être entre 2 et 255 caractères'),
    check('urls').exists().withMessage('Les URLs sont requises').isLength({min: 5, max: 955}).withMessage('Les URLs doivent être entre 5 et 955 caractères'),
    check('message').exists().withMessage('Le message est requis').isLength({min: 5, max: 955}).withMessage('Le message doit être entre 5 et 955 caractères'),
    check('recaptcha').exists().withMessage('La vérification reCAPTCHA est requise'),
    check('email').exists().withMessage('L\'email est requis').isEmail().withMessage('L\'email doit être valide').isLength({min: 2, max: 255}),
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/abuse');
    }

    // Vérification reCAPTCHA
    axios.post('https://www.google.com/recaptcha/api/siteverify', querystring.stringify({
        secret: process.env.RECAPTCHA_PRIVATE,
        response: req.body.recaptcha,
        remoteip: req.connection.remoteAddress
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        if (response.data.success) {
            var Hook = new hookcord.Hook()
                .setLink(process.env.DISCORD_WEBHOOK)
                .setPayload({
                    'embeds': [
                        {
                            'title': 'Nouveau message abuse',
                            'description': 'Un nouveau message abuse a été envoyé depuis le site.',
                            'fields': [
                                {'name': 'Ip', 'value': req.connection.remoteAddress, 'inline': true},
                                {'name': 'Email', 'value': req.body.email, 'inline': true},
                                {'name': 'Type d\'abus', 'value': req.body.abuse, 'inline': true},
                                {'name': 'URLs signalées', 'value': req.body.urls, 'inline': true},
                                {'name': 'Message', 'value': req.body.message, 'inline': true}
                            ],
                            'timestamp': new Date(),
                            'thumbnail': {
                                'url': gravatar.url(req.body.email, {d: 'identicon'}, true)
                            }
                        }
                    ]
                });

            Hook.fire()
                .then(hookResponse => {
                    req.flash('success', 'Votre rapport d\'abus a été envoyé avec succès.');
                    res.redirect('/abuse#form');
                })
                .catch(hookError => {
                    console.error("Error sending webhook:", hookError);
                    req.flash('error', 'Erreur lors de l\'envoi du rapport au serveur.');
                    res.redirect('/abuse#form');
                });
        } else {
            req.flash('error', 'Échec de la vérification reCAPTCHA.');
            res.redirect('/abuse#form');
        }
    }).catch(error => {
        console.error("Error verifying reCAPTCHA:", error);
        req.flash('error', 'Erreur serveur lors de la vérification reCAPTCHA.');
        res.redirect('/abuse#form');
    });
});

/// CONTACT SECTION //

app.post("/contact", [
    check('name').exists().withMessage('Le nom est requis').isLength({ min: 2, max: 255 }).withMessage('Le nom doit être entre 2 et 255 caractères'),
    check('email').exists().withMessage('L\'email est requis').isEmail().withMessage('L\'email doit être valide').isLength({ min: 2, max: 255 }),
    check('message').exists().withMessage('Le message ne peut pas être vide').isLength({ min: 5, max: 955 }).withMessage('Le message doit être entre 5 et 955 caractères'),
    check('recaptcha').exists().withMessage('La vérification reCAPTCHA est requise'),
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/#contact');
    }

    // Vérification reCAPTCHA
    axios.post('https://www.google.com/recaptcha/api/siteverify', querystring.stringify({
        secret: process.env.RECAPTCHA_PRIVATE,
        response: req.body.recaptcha,
        remoteip: req.connection.remoteAddress
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        if (response.data.success) {
            var Hook = new hookcord.Hook()
                .setLink(process.env.DISCORD_WEBHOOK)
                .setPayload({
                    'embeds': [
                        {
                            'title': 'Nouveau message',
                            'description': 'Un nouveau message a été envoyé depuis thingmill.fr',
                            'fields': [
                                {'name': 'Ip', 'value': req.connection.remoteAddress, 'inline': true},
                                {'name': 'User-Agent', 'value': req.headers['user-agent'], 'inline': true},
                                {'name': 'Subject', 'value': req.body.subject, 'inline': true},
                                {'name': 'Nom', 'value': req.body.name, 'inline': true},
                                {'name': 'Email', 'value': req.body.email, 'inline': true},
                                {'name': 'Message', 'value': req.body.message, 'inline': true}
                            ],
                            'timestamp': new Date().toISOString(),
                            'thumbnail': {
                                'url': gravatar.url(req.body.email, {d: 'identicon'}, true)
                            }
                        }
                    ]
                });

            Hook.fire()
                .then(response => {
                    req.flash('success', 'Message envoyé avec succès !');
                    res.redirect('/#contact');
                })
                .catch(error => {
                    console.error("Error sending webhook:", error);
                    req.flash('error', 'Erreur lors de l\'envoi du webhook.');
                    res.redirect('/#contact');
                });
        } else {
            req.flash('error', 'Échec de la vérification reCAPTCHA.');
            res.redirect('/#contact');
        }
    }).catch(error => {
        console.error("Error verifying reCAPTCHA:", error);
        req.flash('error', 'Erreur serveur lors de la vérification reCAPTCHA.');
        res.redirect('/#contact');
    });
});

// RUN SECTION

app.listen(port, host, () => {
    console.log('Application run on ' + host + ':' + port)
})