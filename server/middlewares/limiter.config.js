// NOTE Use to limit repeated requests to public APIs
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const rateLimit = require('express-rate-limit');

// ! default statusCode is 429
apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  headers: true,
});

// NOTE Customs the limit
getWeatherLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many request get weather from client, please try again after an hour',
});

getIPLocation = rateLimit({
  windowMs: 45 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 2 requests per 45 minutes
  message: 'Too many request from this IP, please try again after an hour',
});

// NOTE I will limit the account create on 1 IP (5 account in 1 hour)
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
     {
         status: false,
         message :  "Too many request create account from this IP, please try again after an hour"
     }
  });

const limiter = { apiLimiter, getWeatherLimiter, getIPLocation,createAccountLimiter };

module.exports = limiter;
