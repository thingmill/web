# Thingmill Website

> The Thingmill corp website with Express

## Preview

<center>
<img src="https://cdn.discordapp.com/attachments/517822276889215018/706128061061398618/unknown.png" alt="alt" width="350">
</center>

## Setup

1. Clone the repository: `git clone https://github.com/thingmill/web`
2. Install dependencies: `npm i`
3. Setup `.env` file (Instructions to do so below)
4. Run node server (will listen on 3000 port by default): `node index.js`

## Environment variables

In order to get the server running you will need to fill your .env file.
Create a `.env` file from the `.env.example` file at the root of the folder repository.

Description of the environment variables.

```ini
HOST=0.0.0.0 # Local ip
PORT=3000 # Port

RECAPTCHA_PUBLIC=XXX # Your public Google Captcha api key
RECAPTCHA_PRIVATE=XXX # Your private Google Captcha api key

DISCORD_WEBHOOK=https://discordapp.com/api/webhooks/XXX/XXX # Optionnal, if you want to send contact form to a discord channel
```
