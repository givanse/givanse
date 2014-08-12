import Ember from 'ember';

export default Ember.View.reopen({
  didInsertElement: function () {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.didRenderTemplate);
  },

  didRenderTemplate: Ember.K
});
