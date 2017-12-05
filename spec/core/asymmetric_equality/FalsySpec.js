fdescribe("Falsy", function() {
    it("is true for an empty string", function() {
        var any = new jasmineUnderTest.Falsy();

        expect(any.asymmetricMatch("")).toBe(true);
        expect(any.asymmetricMatch('')).toBe(true);
    });

    it("is false for a number that is not 0", function() {
        var any = new jasmineUnderTest.Falsy(Number);

        expect(any.asymmetricMatch(1)).toBe(false);
        expect(any.asymmetricMatch(0)).toBe(true);
        expect(any.asymmetricMatch(-23)).toBe(false);
        expect(any.asymmetricMatch(-3.1)).toBe(false);
    });

    it("is true for a null or undefined", function() {
        var any = new jasmineUnderTest.Falsy(Function);

        expect(any.asymmetricMatch(null )).toBe(true);
        expect(any.asymmetricMatch(undefined )).toBe(true);
    });

    it("is true for NaN", function() {
        var any = new jasmineUnderTest.Falsy(Object);

        expect(any.asymmetricMatch(NaN)).toBe(true);
    });

    it("is true for a Boolean", function() {
        var any = new jasmineUnderTest.Falsy(Boolean);

        expect(any.asymmetricMatch(false)).toBe(true);
    });
});
