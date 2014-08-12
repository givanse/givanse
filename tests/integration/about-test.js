import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('about integration tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  },
});

test("index route redirects to `about`", function() {
  expect(4);

  visit('/').then(function() {
    equal(currentRouteName(), 'about');
    equal(currentPath(), 'about');
    equal(currentURL(), '/about'); 
    equal(find('a.findme_at i').length, 4, 'the page has 4 profile links');
  });
});
