'use strict';

module.exports = function( app ) {

	// settings
	let env_mode = app.get( 'env' );

	let simpleHandler = require( app.settings.routePath + 'simpleFormHandler' );

	app.use( function( req, res, next ) {
		res.header( 'Access-Control-Allow-Credentials', true );
		res.header( 'Access-Control-Allow-Origin', req.headers.origin );
		res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
		res.header( 'Access-Control-Allow-Methods', 'GET, POST' );
		if ( env_mode == 'development' ) { // don't cache anything in development
			res.header( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
			res.header( 'Pragma', 'no-cache' );
			res.header( 'Expires', 0 );
		}
		return next();
	} );

	// catch all handler for regular URLs
	app.get( '/', simpleHandler.prepareProfileForm, function( req, res ) {
		res.render( 'index', req );
	} );

	app.post( '/apply', simpleHandler.saveProfile, function( req, res ) {
		res.render( 'applicationResults', req );
	} );

	// The index for the tests
	app.get( '/tests', function( req, res ) {
		res.render( 'tests/runner', req );
	} );
	// send the individual test files to the browser
	app.get( '/testRunners/:testName(*)', function( req, res ) {
		res.sendFile( __dirname + '/tests/' + req.params.testName );
	} );
	// This just gets the raw output of the countryList
	app.get( '/tests/getCountryList', simpleHandler.prepareProfileForm, function( req, res ) {
		res.json( req.countryList );
	} );
	// This just gets the raw output of the countryList
	app.get( '/tests/persistence', simpleHandler.saveProfile, function( req, res ) {
		res.json( req.testResults );
	} );

	/* start: error handling */
	app.use( function( req, res, next ) {
		res.status( 404 )
			.send( 'Sorry, that page doesn\'t exist.' );
	} );

	app.use( function( err, req, res, next ) {
		if ( err ) {
			console.error( err );
			throw err;
		}
	} );
	/* end: error handling */

};
