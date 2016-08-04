'use strict';

const express = require( 'express' ),
	app = express(),
	bodyParser = require( 'body-parser' );

app.set( 'port', process.env.PORT || 3000 );
app.set( 'routePath', __dirname + '/routes/' );
app.set( 'view engine', 'ejs' );

app.use( bodyParser.urlencoded( {
	extended: true
} ) );

let env_mode = app.get( 'env' ),
	app_port = app.get( 'port' );

require( app.get( 'routePath' ) + '_routes.js' )( app );

app.listen( app_port, function() {
	console.log( 'simple-express-form listening on port: ' + app_port );
	console.log( 'simple-express-form is running as environment: ' + env_mode );
} );
