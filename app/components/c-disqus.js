import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function () {
        var page_id = window.location.href,
            disqus_identifier = page_id,
            disqus_url = page_id,
            disqus_title = Ember.$('title').text(),
            disqus_shortname = 'givanse',
            el_id = disqus_shortname + Date.now();

        this.set('page_id', el_id);

        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        dsq.id = el_id;
        (document.getElementsByTagName('head')[0] || 
         document.getElementsByTagName('body')[0]).appendChild(dsq);
    },
    willDestroyElement: function () {
        Ember.$('#' +  this.get('page_id')).remove();
    }
});
