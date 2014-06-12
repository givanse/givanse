var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {

    this.route('about');

    this.route('post', {path: 'p/:post_id'});

    this.route('posts');
});

export default Router;
