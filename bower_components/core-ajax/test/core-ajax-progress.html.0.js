
    test('progress', function(done) {
      var ajax = document.querySelector("core-ajax");
      var xhr = sinon.useFakeXMLHttpRequest();
      var headers = {
        "Content-Type": "text/json"
      };
      var body = '{"content": "plentiful"}'
      var requests = this.requests = [];
      xhr.onCreate = function (xhr) {
          requests.push(xhr);
          // Polymer inspects the xhr object for the precense of onprogress to determine
          // whether to attach an event listener.
          xhr['onprogress'] = null;
      };
      var progressEvent = function(lengthComputable, loaded, total) {
        var progress = new ProgressEvent('progress', {
          lengthComputable: lengthComputable,
          loaded: loaded,
          total: total
        });
        return progress;
      }

      // Fake a file download by sending multiple progress events.
      async.series([
        function(cb) {
          ajax.url="http://example.org/downloadLargeFile"
          cb();
        },
        flush,
        animationFrameFlush,
        function(cb) {
          requests[0].dispatchEvent(progressEvent(true, 10, 100));
          cb();
        },
        flush,
        animationFrameFlush,
        function(cb) {
          assert(ajax.loading === true,
              "Request partially complete, but loading property was false.");
          var progress = ajax.progress;
          assert(progress.lengthComputable, "Progress should be computable");
          assert(progress.loaded == 10, "Expected 10 bytes loaded, got " + progress.loaded);
          assert(progress.total == 100, "Expected 100 bytes total, got " + progress.total);
          cb();
        },
        animationFrameFlush,
        function(cb) {
          requests[0].dispatchEvent(progressEvent(true, 100, 100));
          cb();
        },
        animationFrameFlush,
        function(cb) {
          assert(ajax.loading === true,
              "Request partially complete, but loading property was false.");
          var progress = ajax.progress;
          assert(progress.lengthComputable, "Progress should be computable");
          assert(progress.loaded == 100, "Expected 10 bytes loaded, got " + progress.loaded);
          assert(progress.total == 100, "Expected 100 bytes total, got " + progress.total);
          cb();
        },
        function(cb) {
          requests[0].respond(200, headers, body);
          cb();
        },
        animationFrameFlush,
        function(cb) {
          assert(ajax.loading === false,
              "Request complete, but loading property was true.");
          assert(ajax.response.content === "plentiful", "response not parsed");
          cb();
        }
      ], done);
    });
