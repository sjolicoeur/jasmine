describe("StackTrace", function() {
  describe("frames", function() {
    it("understands Chrome/Node/IE/Edge style traces with messages", function() {
      var raw = 
        'Error: nope\n' +
        '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
        '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

      var stackTrace = new jasmineUnderTest.StackTrace(raw);

      expect(stackTrace.frames).toEqual([
        {
          func: 'UserContext.<anonymous>',
          file: 'http://localhost:8888/__spec__/core/UtilSpec.js',
          line: 115
        },
        {
          func: 'QueueRunner.run',
          file: 'http://localhost:8888/__jasmine__/jasmine.js',
          line: 4320
        }
      ]);
    });

    it("understands Chrome/Node/IE/Edge style traces without messages", function() {
      var raw = 'Error\n' +
        '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
        '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

      var stackTrace = new jasmineUnderTest.StackTrace(raw);

      expect(stackTrace.frames).toEqual([
        {
          func: 'UserContext.<anonymous>',
          file: 'http://localhost:8888/__spec__/core/UtilSpec.js',
          line: 115
        },
        {
          func: 'QueueRunner.run',
          file: 'http://localhost:8888/__jasmine__/jasmine.js',
          line: 4320
        }
      ]);
    });

    it("understands Safari/Firefox/Phantom-OS X style traces", function() {
      var raw = 
        'http://localhost:8888/__spec__/core/UtilSpec.js:115:28\n' +
        'run@http://localhost:8888/__jasmine__/jasmine.js:4320:27';
      var stackTrace = new jasmineUnderTest.StackTrace(raw);
      expect(stackTrace.frames).toEqual([
        {
          func: undefined,
          file: 'http://localhost:8888/__spec__/core/UtilSpec.js',
          line: 115
        },
        {
          func: 'run',
          file: 'http://localhost:8888/__jasmine__/jasmine.js',
          line: 4320
        }
      ]);
    });

    it("does not mistake gibberish for Safari/Firefox/Phantom-OS X style traces", function() {
      var raw = 'randomcharsnotincludingwhitespace';
      var stackTrace = new jasmineUnderTest.StackTrace(raw);
      expect(stackTrace.frames).toBeNull();
    });

    it("understands Phantom-Linux style traces", function() {
      var raw = 
        '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
        '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

      var stackTrace = new jasmineUnderTest.StackTrace(raw);

      expect(stackTrace.frames).toEqual([
        {
          func: 'UserContext.<anonymous>',
          file: 'http://localhost:8888/__spec__/core/UtilSpec.js',
          line: 115
        },
        {
          func: 'QueueRunner.run',
          file: 'http://localhost:8888/__jasmine__/jasmine.js',
          line: 4320
        }
      ]);
    });

    it("is null if the stack trace is not understood", function() {
      var raw = 'Something went wrong\n' +
        '    at a place in the code\n' +
        '    which was called from somewhere else.';

      var stackTrace = new jasmineUnderTest.StackTrace(raw);

      expect(stackTrace.frames).toBeNull();
    });
  });
});
