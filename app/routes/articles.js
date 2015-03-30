import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.find('post');
  },

  actions: {
    didTransition: function() {
      Ember.$('title').text('givanse :: Articles');
    }
  }

});
