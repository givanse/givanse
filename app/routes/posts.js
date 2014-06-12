var PostsRoute = Ember.Route.extend({
    model: function () {
        return this.store.all('post');
    }
});

export default PostsRoute;
