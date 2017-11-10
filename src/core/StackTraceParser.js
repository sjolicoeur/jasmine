getJasmineRequireObj().StackTraceParser = function(j$) {
  function StackTraceParser() {
    this.parse = function(rawTrace) {
      var lines = rawTrace
        .split('\n')
        .filter(function(line) { return line !== ''; });
      return parseFrames(lines);
    };
  }

  function parseFrames(lines) {
    return parseChromeStyleFrames(lines) ||
      parseNodeStyleFrames(lines) ||
      parseFirefoxStyleFrames(lines) ||
      null;
  }

  // PhantomJS on Linux, Chrome, IE, Edge
  // e.g. "   at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)"
  function parseChromeStyleFrames(lines) {
    // The first line is the top stack frame on PhantomJS
    // and the error message otherwise.
    if (lines[0].match(/^Error/)) {
      lines = lines.slice(1);
    }

    return tryParseFrames(lines, [
      { re: /^\s*at ([^\)]+) \(([^\)]+)\)$/, fnIx: 1, fileLineColIx: 2 }
    ]);
  }

  // Like Chrome, but sometimes anonymous functions look like this:
  // "  at /some/path:4320:20"
  function parseNodeStyleFrames(lines) {
    if (lines[0].match(/^Error/)) {
      lines = lines.slice(1);
    }
    return tryParseFrames(lines, [
      { re: /^\s*at ([^\)]+) \(([^\)]+)\)$/, fnIx: 1, fileLineColIx: 2 },
      { re: /\s*at (.+)$/, fileLineColIx: 1 }
    ]);
  }

  // PhantomJS on OS X, Safari, Firefox
  // e.g. "run@http://localhost:8888/__jasmine__/jasmine.js:4320:27"
  // or "http://localhost:8888/__jasmine__/jasmine.js:4320:27"
  function parseFirefoxStyleFrames(lines) {
    return tryParseFrames(lines, [
      { re: /^(([^@\s]+)@)?([^\s]+)$/, fnIx: 2, fileLineColIx: 3 }
    ]);
  }

  // regexes should capture the function name (if any) as group 1
  // and the file, line, and column as group 2.
  function tryParseFrames(lines, patterns) {
    var converted = lines.map(function(line) {
      return first(patterns, function(pattern) {
        var overallMatch = line.match(pattern.re),
          fileLineColMatch;
        if (!overallMatch) { return null; }

        fileLineColMatch = overallMatch[pattern.fileLineColIx].match(
          /^(.*):(\d+):\d+$/);
        if (!fileLineColMatch) { return null; }

        return {
          file: fileLineColMatch[1],
          line: parseInt(fileLineColMatch[2], 10),
          func: overallMatch[pattern.fnIx]
        };
      });
    });

    return converted.indexOf(undefined) === -1 ? converted : null;
  }

  function first(items, fn) {
    var i, result;

    for (i = 0; i < items.length; i++) {
      result = fn(items[i]);

      if (result) {
        return result;
      }
    }
  }
  
  return StackTraceParser;
};
