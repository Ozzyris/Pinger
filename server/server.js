// PACKAGES
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    config = require('./config'),    
    morgan = require('morgan');

//HELPERS
const littlebirds = require('./helpers/littlebirds');

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token");
    if ('OPTIONS' == req.method){
        res.sendStatus(200);
    }else{
        next();
    }
});

//SOCKET.IO
io.set('origins', '*:*');
app.set('socketio', io);
littlebirds.discovery_connector( io );

// ALLOW STATIC IMAGES
app.use('/uploads', express.static('uploads'))

// MORGAN LOGGING THE CALLS
app.use(morgan('dev'));

// ROUTES
app.use('/public', require('./controllers/public').public);

// CONFIGURATION
server.listen(config.port);