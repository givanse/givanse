import Ember from 'ember';

export default Ember.View.extend({
  classNames:  ["row"],

  didInsertElement: function () {
    SyntaxHighlighter.highlight({toolbar: false});
  }
});
