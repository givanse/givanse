import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.$('#splash_screen').remove();
  }
});
