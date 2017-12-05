describe("Truthy", function() {
    it("is true for a string", function() {
        var any = new jasmineUnderTest.Truthy();

        expect(any.asymmetricMatch("foo")).toBe(true);
    });

    it("is true for a number that is not 0", function() {
        var any = new jasmineUnderTest.Truthy(Number);

        expect(any.asymmetricMatch(1)).toBe(true);
        expect(any.asymmetricMatch(0)).toBe(false);
        expect(any.asymmetricMatch(-23)).toBe(true);
        expect(any.asymmetricMatch(-3.1)).toBe(true);
    });

    it("is true for a function", function() {
        var any = new jasmineUnderTest.Truthy(Function);

        expect(any.asymmetricMatch(function(){})).toBe(true);
    });

    it("is true for an Object", function() {
        var any = new jasmineUnderTest.Truthy(Object);

        expect(any.asymmetricMatch({})).toBe(true);
    });

    it("is true for a Boolean", function() {
        var any = new jasmineUnderTest.Truthy(Boolean);

        expect(any.asymmetricMatch(true)).toBe(true);
    });

    it("is true for a Map", function() {
        jasmine.getEnv().requireFunctioningMaps();

        var any = new jasmineUnderTest.Truthy(Map);

        expect(any.asymmetricMatch(new Map())).toBe(true);
    });

    it("is true for a Set", function() {
        jasmine.getEnv().requireFunctioningSets();

        var any = new jasmineUnderTest.Truthy(Set);

        expect(any.asymmetricMatch(new Set())).toBe(true);
    });

    it("is true for a TypedArray", function() {
        jasmine.getEnv().requireFunctioningTypedArrays();

        var any = new jasmineUnderTest.Truthy(Uint32Array);

        expect(any.asymmetricMatch(new Uint32Array([]))).toBe(true);
    });

    it("is true for a Symbol", function() {
        jasmine.getEnv().requireFunctioningSymbols();

        var any = new jasmineUnderTest.Truthy(Symbol);

        expect(any.asymmetricMatch(Symbol())).toBe(true);
    });

    it("is true for another constructed object", function() {
        var Thing = function() {},
            any = new jasmineUnderTest.Truthy(Thing);

        expect(any.asymmetricMatch(new Thing())).toBe(true);
    });

    it("jasmineToString's itself", function() {
        var any = new jasmineUnderTest.Truthy(Number);

        expect(any.jasmineToString()).toEqual('<jasmine.any(Number)>');
    });

    xdescribe("when called without an argument", function() {
        it("tells the user to pass a constructor or use jasmine.anything()", function() {
            expect(function() {
                new jasmineUnderTest.Truthy();
            }).toThrowError(TypeError, /constructor.*anything/);
        });
    });
});
