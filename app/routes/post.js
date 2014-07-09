import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function (error, transition) {
      this.transitionTo('error');
    }
  },

  beforeModel: function (transition, queryParams) {
    var templateName = transition.params.post.post_id;
    var templatesArr = Ember.TEMPLATES;

    if ( templatesArr[templateName] ) {
      this.set('templateName', templateName);
      return;
    } else {
      var _this = this;

      var url = GivanseENV.APP.path.templates + templateName + '.hbs';
      return Ember.$.ajax(url)
                    .done(function (data) {
                       templatesArr[templateName] = Ember.Handlebars.compile(data);
                       _this.set('templateName', templateName);
                     });
    } 
  },

  model: function (params) {
    return this.store.find('post', params.post_id);
  }
});
