import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        this.set('templateName', params.post_id);
        return this.store.find('post', params.post_id);
    }
});
