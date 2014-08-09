import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  created: DS.attr('date'),
  updated: DS.attr('date'),
  description: DS.attr()
});
