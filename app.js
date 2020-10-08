var express = require("express");
var http = require('http');
var https = require('https');
var fs = require('fs');
const request = require('request');

const PORT = 8080;

// var sslOptions = {
//   key: fs.readFileSync('_.benbasten.com_private_key.key'),
//   cert: fs.readFileSync('benbasten.com_ssl_certificate.cer'),
//   ca: fs.readFileSync('_.benbasten.com_ssl_certificate_INTERMEDIATE.cer')
// };

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const port = 80;

server.enable('trust proxy');
var options = {
    root: __dirname + '/views'
};

server.use(express.static(__dirname + '/views'));

server.get('/', function(req, res){
    res.sendFile('index.html', options);
});
server.get('/photo', function(req,res){
  res.sendFile('photo.html', options);
});
server.get('/video', function(req,res){
  res.sendFile('video.html', options);
});
server.get('/about', function(req,res){
  res.sendFile('about.html', options);
});
server.get('/contact', function(req,res){
    res.sendFile('contact.html', options);
});
server.get('/resume', function(req,res){
  res.sendFile('resume.html', options);
});
server.get('/*', function(req, res){
  res.sendFile('404.html', options);
});

// http.createServer(server).listen(port, function(){console.log('http listening on port ' + port + '!')});
http.createServer(server).listen(PORT, function(){
  console.log("listening on port " + PORT);
});
// https.createServer(sslOptions, server).listen(443, function(){console.log('https listening on port ' + 443 + '!')});
// server.get('*', function(req, res){
//   res.redirect('https://localhost' + req.url);
// });


server.post('/contact', function (req, res) {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {
        //return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
        return res.json({ "success": false, "msg": "Failed captcha verification" });
        //res.sendFile('error.html', options);
    }

    const secretKey = '6Lc-6rAUAAAAADu2NZHhJ_51qS9E0CVNIPHx7xEv';

    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;
    request(verificationUrl, (error, response, body) => {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "success": false, "msg": "Failed captcha verification" });
            //res.sendFile('error.html', options);
        }
        
        let mailOpts, smtpTrans;
        smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        mailOpts = {
            from: req.body.firstName + ' ' + req.body.lastName,
            to: process.env.GMAIL_USER,
            subject: 'New message from benbasten.com!',
            text: `${req.body.firstName} ${req.body.lastName} (${req.body.email}) says: ${req.body.message}`
        };
        smtpTrans.sendMail(mailOpts, function (error, response) {
            if (error) {
                return res.json({ "success": false, "msg": "Error sending email" })
            }
            else {
                return res.json({ "success": true, "msg": "Email successfully sent!" })
            }
        });
    });

    
});