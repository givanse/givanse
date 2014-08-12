import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function () {
        var page_id = window.location.href,
            disqus_identifier = page_id,
            //disqus_url = page_id,
            disqus_title = Ember.$('title').text(),
            disqus_shortname = 'givanse',
            script_id = disqus_shortname + disqus_identifier + disqus_title;

        this.set('page_id', script_id);

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        script.id = script_id;
        (document.getElementsByTagName('head')[0] || 
         document.getElementsByTagName('body')[0]).appendChild(script);
    },

    script_id: null,

    willDestroyElement: function () {
        Ember.$('#' +  this.get('script_id')).remove();
    }
});
