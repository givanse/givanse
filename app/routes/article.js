import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({

  model: function(params) {
    this.set('templateName', params.article_id);
    var _this = this;

    return this.store.find('post')
      .then(function() {
        if ( ! Ember.TEMPLATES[params.article_id] ) {
          // the template self-registers to Ember.TEMPLATES
          var urlPreCmpTmplt = config.APP.path.posts + params.article_id + '.js';
          return Ember.$.ajax(urlPreCmpTmplt).then(function() {
            return _this.store.find('post', params.article_id);
          });

        } else {
          Ember.Logger.debug("Template already loaded, just find the article.");

          return _this.store.find('post', params.article_id);
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
