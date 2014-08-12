import { test, moduleFor } from 'ember-qunit';

moduleFor('transform:date', 'DateTransform', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function() {
  expect(3);

  var transform = this.subject();

  ok(transform);

  equal(transform.deserialize(undefined), '', "undefined as date");

  equal(transform.deserialize(null), '', "null as date");
});
