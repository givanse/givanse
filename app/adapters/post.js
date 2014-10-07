import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({

  findAll: function(store, type, sinceToken) {
    var query;
    if (sinceToken) {
      query = { since: sinceToken };
    }
    var url = config.APP.path.posts_list;
    return this.ajax(url, 'GET', { data: query });
  }

});
