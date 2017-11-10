getJasmineRequireObj().StackTrace = function(j$) {
  function StackTrace(rawTrace) {
    var lines = rawTrace.split('\n');
    this.frames = extractFrames(lines);
  }

  var traceProcessors = [
    // PhantomJS on Linux, Chrome, Node, IE, Edge
    function(lines) {
      var converted = lines.map(function(line) {
        // e.g. "   at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)"
        // 
        var match = line.match(/^\s*at ([^\)]+) \(([^\)]+)\)$/);
        var result;

        if (!match) {
          return null;
        }

        result = split(match[2]);
        result.func = match[1];
        return result;
      });

      // The first line is the top stack frame on PhantomJS
      // and the error message otherwise.
      if (lines[0].match(/^Error/)) {
        converted.shift();
      }

      return converted[0] ? converted : null;
    },
    // PhantomJS on OS X, Safari, Firefox
    function(lines) {
      var converted = lines.map(function(line) {
        // e.g. "run@http://localhost:8888/__jasmine__/jasmine.js:4320:27"
        // or "http://localhost:8888/__jasmine__/jasmine.js:4320:27"
        // TODO: require line & col?
        var match = line.match(/^(([^@\s]+)@)?([^\s]+)$/);
        var result;

        if (!match) {
          return null;
        }

        result = split(match[3]);

        if (!result) {
          return null;
        }

        result.func = match[2];
        return result;
      });

      return converted[0] ? converted : null;
    }
  ];

  function extractFrames(lines) {
    var i, result;

    for (i = 0; i < traceProcessors.length; i++) {
      result = traceProcessors[i](lines);

      if (result) {
        return result;
      }
    }

    return null;
  }

  function split(fileAndLineAndCol) {
    var match = fileAndLineAndCol.match(/^(.*):(\d+):\d+$/);

    if (match) {
      return { file: match[1], line: parseInt(match[2], 10) };
    }
  }

  return StackTrace;
};
