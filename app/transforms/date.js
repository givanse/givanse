import DS from 'ember-data';

export default DS.DateTransform.extend({
  deserialize: function(serialized) {
    if (serialized) {
      return serialized;
    } else {
      return '';
    }
  }
});
