'use strict';

const config = require( '../config/_config.js' ),
	MongoConnection = require( 'mongodb' ).MongoClient,
	request = require( 'request-json' );

module.exports.saveProfile = function( req, res, next ) {
	req.userData = {
		name: req.body.name ? _capitalizeFirstLetter( req.body.name ) : '',
		sex: req.body.sex ? req.body.sex : '',
		age: req.body.age ? req.body.age : 99,
		country: req.body.country ? req.body.country : '',
		dateCreated: new Date()
	}

	MongoConnection.connect( config.mongoDB.host, function( err, db ) {
		if ( err ) throw err;

		db.collection( 'userData' ).save( req.userData, function( err, result ) {
			if ( err ) throw err;

			// this can finish without making the rest of the request wait. (unless we're testing it)
			if ( req.route.path.indexOf( 'tests' ) > -1 ) {
				db.collection( 'userData' ).find( {
					"dateCreated": {
						$eq: req.userData.dateCreated
					}
				} ).toArray( function( err, results ) {
					// clear up our test record
					db.collection( 'userData' ).remove( {
						"dateCreated": {
							$eq: req.userData.dateCreated
						}
					} );
					req.testResults = results[ 0 ];
					return next();
				} );
			}
		} );
	} );

	// we only need the name field from the form; so we can move on to displaying the thank-you screen whilst mongo runs async (unless we're testing it)
	if ( req.route.path.indexOf( 'tests' ) == -1 ) {
		return next();
	}
}

module.exports.prepareProfileForm = function( req, res, next ) {
	_getCountryList( function( err, countryList ) {
		if ( err ) throw err;

		req.countryList = countryList;
		return next();
	} );
}

var _getCountryList = function( callback ) {

	var countryListConnection = request.createClient( 'https://restcountries.eu' );
	var countryList = [];

	countryListConnection.get( '/rest/v1/region/europe', function( err, results, countryListJSON ) {
		if ( err ) throw err;

		countryListJSON.forEach( function( country ) {
			countryList.push( {
				label: country.name,
				value: country.alpha3Code
			} );
		} );

		callback( null, countryList );

	} );
}

var _capitalizeFirstLetter = function( string ) {
	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}
