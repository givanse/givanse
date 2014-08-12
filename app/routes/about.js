import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    didTransition: function() {
      Ember.$('title').text('givanse :: About');
    }
  }

});
