import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({


  model: function (params) {
    this.set('templateName', params.post_id);
    var _this = this;

    return this.store.find('post')
      .then(function() {
        if ( ! Ember.TEMPLATES[params.post_id] ) {
          Ember.Logger.debug("Fetch precompiled template.");

          // the template self-registers to Ember.TEMPLATES
          var urlPreCmpTmplt = config.APP.path.posts + params.post_id + '.js';
          return Ember.
          $.ajax(urlPreCmpTmplt)
           .then(function() {
             return _this.store.find('post', params.post_id);
           });

        } else {
          Ember.Logger.debug("Template already loaded, just find the post.");

          return _this.store.find('post', params.post_id);
        }
      });
  },

  actions: {
    didTransition: function() {
      var title = this.get('controller.title');
      Ember.$('title').text('givanse :: ' + title);
    }
  }

});
