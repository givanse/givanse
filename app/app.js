import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import View from './reopen/view';
/*exported View*/

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'givanse', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'givanse');

export default App;
