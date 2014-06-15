import Ember from 'ember';

export default Ember.Route.extend({
    init: function () {
        this._super();

        var posts = [
            {id: '00000000', title: 'ember-cli & ember-simple-auth-devise', date: '12 / Jun / 2014',
             description: 'Authenticate to a Rails-Devise server from an Ember CLI app.'}
        ];

        for (var i = 0; i < posts.length; i++) {
            this.store.createRecord('post', posts[i]);
        }
    }
});
