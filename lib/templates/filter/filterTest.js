define( [ 'initializer', 'angularAMD', '#PATH#/#NAME#Filter' ], function(app, angularAMD) {

	'use strict';

	describe( '#NAME#Filter', function() {

		var filter;

		beforeEach( function() {
			angularAMD.inject( function($filter) {
				filter = $filter( '#NAME#Filter' );
			} );
		} );

	} );
} );
