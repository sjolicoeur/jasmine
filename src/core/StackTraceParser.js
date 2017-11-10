getJasmineRequireObj().StackTraceParser = function(j$) {
  function StackTraceParser() {
    this.parse = function(rawTrace) {
      var lines = rawTrace.split('\n');
      return parseFrames(lines);
    };
  }

  function parseFrames(lines) {
    return parseChromeStyleFrames(lines) ||
      parseFirefoxStyleFrames(lines) ||
      null;
  }

  // PhantomJS on Linux, Chrome, Node, IE, Edge
  // e.g. "   at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)"
  function parseChromeStyleFrames(lines) {
    // The first line is the top stack frame on PhantomJS
    // and the error message otherwise.
    if (lines[0].match(/^Error/)) {
      lines = lines.slice(1);
    }

    return tryParseFrames(lines, /^\s*at ([^\)]+) \(([^\)]+)\)$/, 1, 2);
  }

  // PhantomJS on OS X, Safari, Firefox
  // e.g. "run@http://localhost:8888/__jasmine__/jasmine.js:4320:27"
  // or "http://localhost:8888/__jasmine__/jasmine.js:4320:27"
  function parseFirefoxStyleFrames(lines) {
    return tryParseFrames(lines, /^(([^@\s]+)@)?([^\s]+)$/, 2, 3);
  }

  function tryParseFrames(lines, regex, funcGroupIx, fileAndLineAndColGroupIx) {
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

    return converted.indexOf(null) === -1 ? converted : null;
  }

  return StackTraceParser;
};
