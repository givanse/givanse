import Ember from 'ember';

export default Ember.View.extend({
  classNames:  ["row post"],

  didInsertElement: function () {
    SyntaxHighlighter.highlight({toolbar: false});
  }
});
