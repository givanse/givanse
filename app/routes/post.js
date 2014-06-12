var PostRoute = Ember.Route.extend({
    model: function (params) {
        this.set('id', params.post_id);
        return this.store.find('post', params.post_id);
    },
    renderTemplates: function(controller, model){
        this.render( this.get('id') );
    }
});

export default PostRoute;
