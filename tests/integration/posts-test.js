import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('posts integration tests', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    },
});

test("list all the available posts", function() {
  expect(1);

  visit('/articles').then(function() {
    equal(find('div.post').length, 6, 'listed 6 posts');
  });

});
