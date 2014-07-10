import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function (error, transition) {
      this.transitionTo('error');
    }
  },

  isPostsListLoaded: false,

  beforeModel: function () {
    if ( this.get('isPostsListLoaded') ) {
      return;
    }

    var _this = this;

    var url = GivanseENV.APP.path.posts;
    return Ember.$.getJSON(url)
                  .done(function (data) {
                     for (var i = data.length-1; i >= 0; i--) {
                       var post = data[i];
                       //TODO: Uncaught #<error>
                       _this.store.createRecord('post', post);
                     }

                     //TODO: Uncaught #<error>
                     _this.set("isPostsListLoaded", true);
                  });
  }
});
