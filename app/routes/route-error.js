import Ember from 'ember';

export default Ember.Route.extend({
  serialize: function(model, params) {
    return { status: model.status };
  }
});
