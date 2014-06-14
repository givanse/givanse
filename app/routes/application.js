import Ember from 'ember';

export default Ember.Route.extend({
    init: function () {
        this._super();

        var posts = [
            {id: '00000000', title: 'foobar 1', date: '12 / Jun / 2014',
             description: 'lorem ipsum'},
            {id: '00000001', title: 'foobar 2', date: '12 / Jun / 2014',
             description: 'lorem ipsum'}
        ];

        for (var i = 0; i < posts.length; i++) {
            this.store.createRecord('post', posts[i]);
        }
    }
});
