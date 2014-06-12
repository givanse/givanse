var ApplicationRoute = Ember.Route.extend({
    init: function () {
        this._super();

        // has a limit for 256 posts, should be enough 
        var posts = [
            {id: '00000000', title: 'ember-cli & ember-simple-auth-devise', date: '12 / Jun / 2014'}
        ];
        for (var i = 0; i < posts.length; i++) {
            this.store.createRecord('post', posts[i]);
        }
    }
});

export default ApplicationRoute;
