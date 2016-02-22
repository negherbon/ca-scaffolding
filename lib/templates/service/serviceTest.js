define(['initializer', 'angularAMD', '#PATH#/#NAME#Service'], function(app, angularAMD) {
  describe('#NAME#Service', function() {

    var service;

    beforeEach(function() {
      angularAMD.inject(function(#SERVICE_TEST_NAME#Service) {
        service = #SERVICE_TEST_NAME#Service;
      });
    });

    describe('', function() {
      it('', function() {
        expect('').toBe();
      });
    });

  });
});
