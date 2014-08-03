import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function (transition, queryParams) {
    var templateName = transition.params.post.post_id;
    var templatesArr = Ember.TEMPLATES;

    if ( templatesArr[templateName] ) {
      this.set('templateName', templateName);
      return;
    } else {
      var _this = this;

      var urlPreCmpTmplt = GivanseENV.APP.path.templates + 
                           templateName + '.js';
      return Ember.$.ajax(urlPreCmpTmplt)
                    .done(function (template) {
                       // The pre-compiled template was found and
                       // now it is loaded. 
                       _this.set('templateName', templateName);
                     });
    } 
  },

  model: function (params) {
    return this.store.find('post', params.post_id);
  }
});
