import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GivanseENV.locationType
});

Router.map(function() {
    this.route('about');

    this.route('post', {path: 'p/:post_id'});

    this.route('posts');

    this.route('error');
});

export default Router;
