import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    switch ( params.post_id ) {
      case '00000000':
        this.transitionTo('article', 'ember-cli-simple-auth-devise');
        break;
      case '00000001':
        this.transitionTo('article', 'ember-cli-phonegap');
        break;
      case '00000010':
        this.transitionTo('article', 'mvc-past-present-and-future');
        break;
      default:
        this.transitionTo('article', params.post_id);
    }
  }

});
