define(['initializer', 'angularAMD', '#SERVICE_TEST_PATH#/#SERVICE_TEST_NAME#Service'], function(
  app, angularAMD) {
  describe('#SERVICE_TEST_NAME#Service', function() {

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
