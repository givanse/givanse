import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        error: function (error, transition) {
            this.transitionTo('error');
        }
    },

    beforeModel: function (transition, queryParams) {
        var templateName = transition.params.post.post_id;
        var tptsArr = Ember.TEMPLATES;

        if ( tptsArr[templateName] ) {
            this.set('templateName', templateName);
            return;
        } else {
            var _this = this;

            return Ember.$.ajax('posts_templates/' + templateName + '.hbs')
                   .done(function (data) {
                       tptsArr[templateName] = Ember.Handlebars.compile( data );
                       _this.set('templateName', templateName);
                   });
        } 
    },

    model: function (params) {
        return this.store.find('post', params.post_id);
    }
});
