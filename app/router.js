import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('404', {path: '*path'});

  this.route('about');

  this.route('post', {path: 'p/:post_id'});

  this.route('articles');

  this.route('route-error', {path: 'error/:status'});

  this.route('article', {path: '/:article_id'});
});

export default Router;
