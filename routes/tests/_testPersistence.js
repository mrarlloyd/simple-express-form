'use strict';

describe( 'Test: Mongo Persistence', function() {

	callRoute( 'get', '/tests/persistence', {}, function( result ) {
		it('should return an object', function(){
      assert.isObject(result, 'result is not an object');
    });

    it('should contain all relevant keys', function(){
      var _reqKeys = [
        '_id'
        , 'name'
        , 'sex'
        , 'age'
        , 'country'
        , 'dateCreated'
      ];
      expect(result, 'missing relevant key(s)').to.contain.all.keys(_reqKeys);
    });

		it('age key should be a number', function(){
      assert.isNumber(result.age, 'age key is not a number');
    });

		it('dateCreated key should be a date', function(){
      assert(new Date(result.dateCreated) instanceof Date, 'dateCreated key is not a date');
    });

	} );

} );
