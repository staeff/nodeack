var expect = require('chai').expect;
var tags = require('../src/tags.js');

describe('Tags', function() {
  describe('#parse()', function() {
    it('should accept key-value options and parse them into an object', function() {
      var args = ['--depth=4', '--hello=world'];
      var results = tags.parse(args);

      expect(results).to.have.a.property('depth', 4);
      expect(results).to.have.a.property('hello', 'world');
    });
    it('should fallback to defaults', function() {
      var args = ['--depth=4', '--hello=world'];
      var defaults = {
        depth: 2,
        foo: 'bar'
      };
      var results = tags.parse(args, defaults);

      var expected = {
        depth: 4,
        foo: 'bar',
        hello: 'world'
      };
      expect(results).to.deep.equal(expected);
    });
    it('should accept simple options and set them', function() {
      var args = ['--searchContents'];
      var results = tags.parse(args);

      expect(results).to.have.a.property('searchContents', true);
    });
    it('should accept short options', function() {
      var args = ['-sd=4', '-h'];
      var replacements = {
        s: 'searchContents',
        d: 'depth',
        h: 'hello'
      };

      var results = tags.parse(args, {}, replacements);

      var expected = {
        searchContents: true,
        depth: 4,
        hello: true
      };

      expect(results).to.deep.equal(expected);
    });
  });
});
