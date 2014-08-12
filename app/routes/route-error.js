import Ember from 'ember';

export default Ember.Route.extend({
  serialize: function(model) {
    return { status: model.status };
  }
});
