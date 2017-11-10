describe("StackTraceParser", function() {
  it("understands Chrome/IE/Edge style traces with messages", function() {
    var raw = 
      'Error: nope\n' +
      '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
      '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);

    expect(frames).toEqual([
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

  it("understands Chrome/IE/Edge style traces without messages", function() {
    var raw = 'Error\n' +
      '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
      '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);

    expect(frames).toEqual([
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

  it("understands Node style traces", function() {
    var raw = 'Error\n' +
      '  at /somewhere/jasmine/lib/jasmine-core/jasmine.js:4255:9\n' +
      '  at QueueRunner.complete [as onComplete] (/somewhere/jasmine/lib/jasmine-core/jasmine.js:579:9)\n' +
      '  at Immediate.<anonymous> (/somewhere/jasmine/lib/jasmine-core/jasmine.js:4314:12)\n' +
      '  at runCallback (timers.js:672:20)';
    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).toEqual([
      {
        func: undefined,
        file: '/somewhere/jasmine/lib/jasmine-core/jasmine.js',
        line: 4255
      },
      {
        func: 'QueueRunner.complete [as onComplete]',
        file: '/somewhere/jasmine/lib/jasmine-core/jasmine.js',
        line: 579
      },
      {
        func: 'Immediate.<anonymous>',
        file: '/somewhere/jasmine/lib/jasmine-core/jasmine.js',
        line: 4314
      },
      {
        func: 'runCallback',
        file: 'timers.js',
        line: 672
      }
    ]);
  });

  it("understands Safari/Firefox/Phantom-OS X style traces", function() {
    var raw = 
      'http://localhost:8888/__spec__/core/UtilSpec.js:115:28\n' +
      'run@http://localhost:8888/__jasmine__/jasmine.js:4320:27';
    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).toEqual([
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
    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).toBeNull();
  });

  it("understands Phantom-Linux style traces", function() {
    var raw = 
      '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
      '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);

    expect(frames).toEqual([
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

  it("ignores blank lines", function() {
    var raw = 
      '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);

    expect(frames).toEqual([
      {
        func: 'UserContext.<anonymous>',
        file: 'http://localhost:8888/__spec__/core/UtilSpec.js',
        line: 115
      }
    ]);
  });

  it("returns null if the stack trace is not understood", function() {
    var raw = 'Something went wrong\n' +
      '    at a place in the code\n' +
      '    which was called from somewhere else.';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).toBeNull();
  });

  it("returns null if only some frames parse", function() {
    var raw = 
      '    at UserContext.<anonymous> (http://localhost:8888/__spec__/core/UtilSpec.js:115:19)\n' +
      '    but this is quite unexpected\n' +
      '    at QueueRunner.run (http://localhost:8888/__jasmine__/jasmine.js:4320:20)';

    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).toBeNull();
  });

  it("handles this one thing", function() {
    var raw = 'Error\n' +
      '  at errorWithStack (/Users/work/workspace/jasmine/src/core/util.js:117:13)\n' +
      '  at Object.util.callerFile (/Users/work/workspace/jasmine/src/core/util.js:125:27)\n' +
      '  at foo (/Users/work/workspace/jasmine/spec/core/UtilSpec.js:105:38)\n' +
      '  at UserContext.<anonymous> (/Users/work/workspace/jasmine/spec/core/UtilSpec.js:108:22)\n' +
      '  at attempt (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4372:46)\n' +
      '  at QueueRunner.run (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4300:20)\n' +
      '  at QueueRunner.execute (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4282:10)\n' +
      '  at Spec.queueRunnerFactory (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:972:35)\n' +
      '  at Spec.execute (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:572:10)\n' +
      '  at UserContext.fn (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:5508:37)\n' +
      '  at attempt (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4380:26)\n' +
      '  at QueueRunner.run (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4300:20)\n' +
      '  at runNext (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4340:20)\n' +
      '  at /Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4347:13\n' +
      '  at /Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4255:9\n' +
      '  at QueueRunner.complete [as onComplete] (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:579:9)\n' +
      '  at Immediate.<anonymous> (/Users/work/workspace/jasmine/lib/jasmine-core/jasmine.js:4314:12)\n' +
      '  at runCallback (timers.js:672:20)\n' +
      '  at tryOnImmediate (timers.js:645:5)\n' +
      '  at processImmediate [as _immediateCallback] (timers.js:617:5)\n';
    var frames = new jasmineUnderTest.StackTraceParser().parse(raw);
    expect(frames).not.toBeNull();
  });
});
