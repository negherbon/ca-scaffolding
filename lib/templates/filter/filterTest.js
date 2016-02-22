define( [ 'initializer', 'angularAMD', '#PATH#/#NAME#Filter' ], function(app, angularAMD) {

	describe( '#NAME#Filter', function() {

		var filter;

		beforeEach( function() {
			angularAMD.inject( function($filter) {
				filter = $filter( '#NAME#Filter' );
			} );
		} );

	} );
} );
