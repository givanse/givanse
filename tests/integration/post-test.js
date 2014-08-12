import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('single post integration tests', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    },
});

test("visit 0000 0000", function() {
  expect(2);

  visit('/p/00000000').then(function() {
    equal(find('time.post_date').length, 2, 'has two date attributes');

    ok(find('div#disqus_thread iframe'), 'has a disqus iframe');
  });
});

test("visit 0000 0010", function() {
  expect(2);

  visit('/p/00000010').then(function() {
    equal(find('time.post_date').length, 2, 'has two date attributes');

    ok(find('div#disqus_thread iframe'), 'has a disqus iframe');
  });
});

test("visit 0000 0002", function() {
  expect(3);

  visit('/p/00000002').then(function() {
    equal(currentRouteName(), 'route-error');
    equal(currentPath(), 'route-error');
    equal(currentURL(), '/error/404'); 
  });
});
