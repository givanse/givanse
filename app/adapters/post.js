import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  findAll: function(store, type, sinceToken) {
    var query;
    if (sinceToken) {
      query = { since: sinceToken };
    }
    var url = GivanseENV.APP.path.posts_list;
    return this.ajax(url, 'GET', { data: query });
  }

});
