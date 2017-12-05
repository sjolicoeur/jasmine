fdescribe("Empty", function() {
    it("matches an empty object", function() {
        var any = new jasmineUnderTest.Empty();

        expect(any.asymmetricMatch({})).toBe(true);
        expect(any.asymmetricMatch({undefined: false})).toBe(false);
    });

    it("matches an empty array", function() {
        var any = new jasmineUnderTest.Empty();

        expect(any.asymmetricMatch([])).toBe(true);
        expect(any.asymmetricMatch([1,12,3])).toBe(false);
    });

    it("matches an empty string", function() {
        var any = new jasmineUnderTest.Empty();

        expect(any.asymmetricMatch("")).toBe(true);
        expect(any.asymmetricMatch('')).toBe(true);
    });

    it("matches an empty map", function() {
        var any = new jasmineUnderTest.Empty(Function);

        expect(any.asymmetricMatch(new Map())).toBe(true);
    });
});
