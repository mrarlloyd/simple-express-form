'use strict';

describe( 'Test: Returning country list', function() {

	callRoute( 'get', '/tests/getCountryList', {}, function( result ) {

		it( 'data key should be an array', function() {
			assert.isArray( result, 'data key is not an array' );
		} );

		it( 'data array should contain at least one object with relevant keys', function() {
			var _reqKeys = [
				'label', 'value'
			];
			for ( var _idx in result.data ) {
				var _struct = result.data[ _idx ];
				assert.isObject( _struct, 'inner key is not an object' );
				expect( _struct, 'inner object missing relevant key(s)' ).to.contain.all.keys( _reqKeys );
			}
		} );

	} );

} );
