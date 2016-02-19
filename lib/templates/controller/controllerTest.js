define(['initializer', 'angularAMD', '#CONTROLLER_TEST_PATH#/#CONTROLLER_TEST_NAME#Controller'], function(app,
  angularAMD) {

  describe('#CONTROLLER_TEST_NAME#Controller', function() {

    var scope;
    beforeEach(function() {
      angularAMD.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('#CONTROLLER_TEST_NAME#Controller', {
          $scope: scope
        });
      });
    });

    it('app should be defined.', function() {
      expect(app).toBeDefined();
    });

  });
});
