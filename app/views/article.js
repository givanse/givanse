import Ember from 'ember';

export default Ember.View.extend({
  classNames:  ["row post"],

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function() {
      SyntaxHighlighter.highlight({toolbar: false});
    });
  }
});
