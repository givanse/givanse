import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function (error, transition) {
      Ember.Logger.debug("ERROR");
      Ember.Logger.debug(error);
      Ember.Logger.debug("TRANSITION");
      Ember.Logger.debug(transition);

      var model = {
        status: error.status,
        statusText: error.statusText,
        url: transition.intent.url
      };
      this.transitionTo('route-error', model);
    }
  }
});
