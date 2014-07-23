import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        SyntaxHighlighter.highlight({toolbar: false});
    }
});
