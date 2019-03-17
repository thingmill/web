const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const axios = require('axios')
const querystring = require('querystring')
const hookcord = require('hookcord')
const gravatar = require('gravatar')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const {
    check,
    validationResult
} = require('express-validator/check');


let host = process.env.HOST == undefined ? '0.0.0.0' : process.env.HOST
let port = process.env.PORT == undefined ? 3000 : process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        recaptchaKey: process.env.RECAPTCHA_PUBLIC,
        recaptcha: ''
    });
})

app.get('/abuse', function (req, res) {
    res.render('legal/abuse', {
        recaptchaKey: process.env.RECAPTCHA_PUBLIC,
        recaptcha: ''
    });
})

app.get('/notice', function (req, res) {
    res.render('legal/notice');
});

app.get('/privacy', function (req, res) {
    res.render('legal/privacy');
});

app.get('/terms-and-conditions', function (req, res) {
    res.render('legal/terms-and-conditions');
});

app.get('/activities', function (req, res) {
    res.render('activities');
});

app.get('/projects', function (req, res) {
    res.render('projects');
});

app.get('*', function (req, res) {
    res.render('errors/404');
});

// ABUSE SECTION //

app.post("/abuse_contact", [
    check('name').exists(),
    check('name').isLength({
        min: 2,
        max: 255
    }),
    check('url').exists(),
    check('url').isLength({
        min: 2,
        max: 255
    }),
    check('message').exists(),
    check('message').isLength({min: 5, max: 955}),
    check('recaptcha').exists(),
    check('email').exists(),
    check('email').isLength({
        min: 2,
        max: 255
    }),
    check('email').isEmail()
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    axios.post('https://www.google.com/recaptcha/api/siteverify',
        querystring.stringify({
            secret: process.env.RECAPTCHA_PRIVATE,
            response: req.body.recaptcha,
            remoteip: req.connection.remoteAddress
        }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        if (response.data.success) {
            res.json({
                success: true
            })

            var Hook = new hookcord.Hook()
                .setLink(process.env.DISCORD_WEBHOOK)
                .setPayload({
                    'embeds': [
                        {
                            'title': 'Nouveau message',
                            'description': 'Un nouveau message a été envoyé depuis thingmill.fr',
                            'fields': [
                                {
                                    'name': 'Ip',
                                    'value': req.connection.remoteAddress,
                                    'inline': true,
                                },
                                {
                                    'name': 'Nom',
                                    'value': req.body.name,
                                    'inline': true,
                                },
                                {
                                    'name': 'Email',
                                    'value': req.body.email,
                                    'inline': true,
                                },
                                {
                                    'name': 'Entreprise',
                                    'value': req.body.company,
                                    'inline': true,
                                },
                                {
                                    'name': 'Message',
                                    'value': req.body.message,
                                    'inline': true,
                                }
                            ],
                            'timestamp': new Date(),
                            'thumbnail': {
                                url: 'https:' + gravatar.url(req.body.email, {
                                    d: 'identicon'
                                })
                            }
                        }
                    ]
                })
                .fire()
                .then(function (response) {})
                .catch(function (e) {})

            // send webhook
            // send email

        }
    }).catch(() => {
        return res.json({
            success: false
        })
    })
});

/// CONTACT SECTION //

app.post("/contact", [
    check('name').exists(),
    check('name').isLength({
        min: 2,
        max: 255
    }),
    check('company').exists(),
    check('company').isLength({
        min: 2,
        max: 255
    }),
    check('message').exists(),
    check('message').isLength({min: 5, max: 955}),
    check('recaptcha').exists(),
    check('email').exists(),
    check('email').isLength({
        min: 2,
        max: 255
    }),
    check('email').isEmail()
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    axios.post('https://www.google.com/recaptcha/api/siteverify',
        querystring.stringify({
            secret: process.env.RECAPTCHA_PRIVATE,
            response: req.body.recaptcha,
            remoteip: req.connection.remoteAddress
        }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        if (response.data.success) {
            res.json({
                success: true
            })

            var Hook = new hookcord.Hook()
                .setLink(process.env.DISCORD_WEBHOOK)
                .setPayload({
                    'embeds': [
                        {
                            'title': 'Nouveau message',
                            'description': 'Un nouveau message a été envoyé depuis thingmill.fr',
                            'fields': [
                                {
                                    'name': 'Ip',
                                    'value': req.connection.remoteAddress,
                                    'inline': true,
                                },
                                {
                                    'name': 'Nom',
                                    'value': req.body.name,
                                    'inline': true,
                                },
                                {
                                    'name': 'Email',
                                    'value': req.body.email,
                                    'inline': true,
                                },
                                {
                                    'name': 'Entreprise',
                                    'value': req.body.company,
                                    'inline': true,
                                },
                                {
                                    'name': 'Message',
                                    'value': req.body.message,
                                    'inline': true,
                                }
                            ],
                            'timestamp': new Date(),
                            'thumbnail': {
                                url: 'https:' + gravatar.url(req.body.email, {
                                    d: 'identicon'
                                })
                            }
                        }
                    ]
                })
                .fire()
                .then(function (response) {})
                .catch(function (e) {})

            // send webhook
            // send email

        }
    }).catch(() => {
        return res.json({
            success: false
        })
    })
});

// RUN SECTION

app.listen(port, host, () => {
    console.log('Application run on ' + host + ':' + port)
})
