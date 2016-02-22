define( [ 'initializer', 'angularAMD', '#PATH#/#NAME#Controller' ], function(app,
angularAMD) {

	'use strict';

	describe( '#NAME#Controller', function() {

		var scope;
		beforeEach( function() {
			angularAMD.inject( function($rootScope, $controller) {
				scope = $rootScope.$new();
				$controller( '#NAME#Controller', {
					$scope : scope
				} );
			} );
		} );

		it( 'app should be defined.', function() {
			expect( app ).toBeDefined();
		} );

	} );
} );
