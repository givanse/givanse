import Ember from 'ember';

export default Ember.Route.extend({
  init: function() {
    
    var _this = this;

    var url = GivanseENV.APP.path.posts_list;
    Ember.$.getJSON(url)
    .done(function (data) {
      // sort elements by iterating backwards
      for (var i = data.length-1; i >= 0; i--) {
        var post = data[i];
        //TODO: Uncaught #<error>
        _this.store.createRecord('post', post);
      }
    });
  },

  model: function () {
    return this.store.all('post');
  }
});
