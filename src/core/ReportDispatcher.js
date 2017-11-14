getJasmineRequireObj().ReportDispatcher = function(j$) {
  function ReportDispatcher(methods) {

    var dispatchedMethods = methods || [];

    for (var i = 0; i < dispatchedMethods.length; i++) {
      var method = dispatchedMethods[i];
      this[method] = (function(m) {
        return function() {
          dispatch(m, arguments);
        };
      }(method));
    }

    var reporters = [];
    var hasReporters = false;
    var fallbackReporter = null;

    this.addReporter = function(reporter) {
      reporters.push(reporter);
      hasReporters = true;
    };

    this.addInternalReporter = function(reporter) {
      reporters.push(reporter);
    };

    this.provideFallbackReporter = function(reporter) {
      fallbackReporter = reporter;
    };

    this.clearReporters = function() {
      reporters = [];
    };

    return this;

    function dispatch(method, args) {
      if (!hasReporters && fallbackReporter !== null) {
          reporters.push(fallbackReporter);
      }
      for (var i = 0; i < reporters.length; i++) {
        var reporter = reporters[i];
        if (reporter[method]) {
          reporter[method].apply(reporter, j$.util.cloneArgs(args));
        }
      }
    }
  }

  return ReportDispatcher;
};

