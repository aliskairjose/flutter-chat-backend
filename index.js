const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
const { dbConn } = require('./database/config');
dbConn();


// App de Express
const app = express();

// Read and parse body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// My routes
app.use( '/api/login', require('./routes/auth'))

server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


