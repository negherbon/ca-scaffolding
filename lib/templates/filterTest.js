define(['initializer', 'angularAMD' , '#FILTER_TEST_PATH#/#FILTER_TEST_NAME#Filter' ], function(app, angularAMD) {

  describe('#FILTER_TEST_NAME#Filter', function() {

    var filter;

    beforeEach(function() {
      angularAMD.inject(function($filter) {
        filter = $filter('#FILTER_NAME#Filter');
      });
    });

  });
});
