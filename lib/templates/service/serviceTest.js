define(['initializer', 'angularAMD', '#PATH#/#NAME#Service'], function(app, angularAMD) {

  'use strict';

  describe('#NAME#Service', function() {

    var service;

    beforeEach(function() {
      angularAMD.inject(function(#NAME#Service) {
        service = #NAME#Service;
      });
    });

    describe('', function() {
      it('', function() {
        expect('').toBe();
      });
    });

  });
});
