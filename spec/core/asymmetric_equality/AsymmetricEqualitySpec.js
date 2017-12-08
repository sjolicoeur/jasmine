describe("Falsy", function() {
  describe('Truthy/Falsy equalities', function() {
    it('allows the test to pass', function() {
      expect({
        name: "Rex",
        id: null,
        description: undefined,
        age: 42,
        tags: [],
      }).toEqual({
        name: jasmine.truthy(),
        id: jasmine.falsy(),
        description: jasmine.falsy(),
        age: jasmine.truthy(),
        tags: jasmine.truthy(),
      })
    })
  });

  describe('empty/notEmpty equalities', function() {
    it('allows the test to pass', function() {
      var tags = new Set(['blue', 'green']);
      expect({
        name: "Rex",
        description: '',
        age: 42,
        tags: tags,
        gps_coord: []
      }).toEqual({
        name: jasmine.notEmpty(),
        description: jasmine.empty(),
        age: jasmine.truthy(),
        tags: jasmine.notEmpty(),
        gps_coord: jasmine.empty()
      })
    })
  });
});
