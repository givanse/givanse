import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GivanseENV.locationType
});

Router.map(function() {
  this.route('404', {path: '*path'});

  this.route('about');

  this.route('post', {path: 'p/:post_id'});

  this.route('posts');

  this.route('route-error', {path: 'error/:status'});
});

export default Router;
