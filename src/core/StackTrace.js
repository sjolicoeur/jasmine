getJasmineRequireObj().StackTrace = function(j$) {
  function StackTrace(rawTrace) {
    var lines = rawTrace.split('\n');
    this.frames = extractFrames(lines);
  }

  // PhantomJS on Linux, Chrome, Node, IE, Edge
  function extractChromeStyleFrames(lines) {
    var converted = lines.map(function(line) {
      // e.g. "   at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)"
      // 
      var match = line.match(/^\s*at ([^\)]+) \(([^\)]+)\)$/);

      if (!match) {
        return null;
      }

      return makeFrame(match[2], match[1]);
    });

    // The first line is the top stack frame on PhantomJS
    // and the error message otherwise.
    if (lines[0].match(/^Error/)) {
      converted.shift();
    }

    return converted[0] ? converted : null;
  }

  // PhantomJS on OS X, Safari, Firefox
  function extractFirefoxStyleFrames(lines) {
    var converted = lines.map(function(line) {
      // e.g. "run@http://localhost:8888/__jasmine__/jasmine.js:4320:27"
      // or "http://localhost:8888/__jasmine__/jasmine.js:4320:27"
      var match = line.match(/^(([^@\s]+)@)?([^\s]+)$/);
      var result;

      if (!match) {
        return null;
      }

      return makeFrame(match[3], match[2]);
    });

    return converted[0] ? converted : null;
  }

  function extractFrames(lines) {
    return extractChromeStyleFrames(lines) ||
      extractFirefoxStyleFrames(lines) ||
      null;
  }

  function makeFrame(fileAndLineAndCol, func) {
    var match = fileAndLineAndCol.match(/^(.*):(\d+):\d+$/);

    if (match) {
      return {
        file: match[1],
        line: parseInt(match[2], 10),
        func: func
      };
    }
  }

  return StackTrace;
};
