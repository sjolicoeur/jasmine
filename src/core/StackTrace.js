getJasmineRequireObj().StackTrace = function(j$) {
  function StackTrace(rawTrace) {
    var lines = rawTrace.split('\n');
    this.frames = extractFrames(lines);
  }

  function extractFrames(lines) {
    return extractChromeStyleFrames(lines) ||
      extractFirefoxStyleFrames(lines) ||
      null;
  }

  // PhantomJS on Linux, Chrome, Node, IE, Edge
  function extractChromeStyleFrames(lines) {
    // The first line is the top stack frame on PhantomJS
    // and the error message otherwise.
    if (lines[0].match(/^Error/)) {
      lines = lines.slice(1);
    }

    // e.g. "   at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)"
    return tryExtractFrames(lines, /^\s*at ([^\)]+) \(([^\)]+)\)$/, 1, 2);
  }

  // PhantomJS on OS X, Safari, Firefox
  function extractFirefoxStyleFrames(lines) {
    // e.g. "run@http://localhost:8888/__jasmine__/jasmine.js:4320:27"
    // or "http://localhost:8888/__jasmine__/jasmine.js:4320:27"
    return tryExtractFrames(lines, /^(([^@\s]+)@)?([^\s]+)$/, 2, 3);
  }

  function tryExtractFrames(lines, regex, funcGroupIx, fileAndLineAndColGroupIx) {
    var converted = lines.map(function(line) {
      var overallMatch = line.match(regex);
      var fileLineColMatch;
      if (!overallMatch) { return null; }
      fileLineColMatch = overallMatch[fileAndLineAndColGroupIx].match(
        /^(.*):(\d+):\d+$/);
      if (!fileLineColMatch) { return null; }

      return {
        file: fileLineColMatch[1],
        line: parseInt(fileLineColMatch[2], 10),
        func: overallMatch[funcGroupIx]
      };
    });

    return converted[0] ? converted : null;
  }

  return StackTrace;
};
