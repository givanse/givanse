import Ember from 'ember';

export default Ember.View.extend({
  classNames:  ["row post"],

  didRenderTemplate: function () {
    SyntaxHighlighter.highlight({toolbar: false});
  }
});
