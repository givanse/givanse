import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    this.set('templateName', params.post_id);

    if ( Ember.TEMPLATES[params.post_id] ) {
      return this.store.find('post', params.post_id);
    } else {
      var urlPreCmpTmplt = GivanseENV.APP.path.posts + params.post_id + '.js';
      var _this = this;

      // the template self-registers to Ember.TEMPLATES
      return Ember.
      $.ajax(urlPreCmpTmplt)
       .then(function(template) {
         return _this.store.find('post', params.post_id);
       });
    }

  }

});
