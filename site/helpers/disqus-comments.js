var Handlebars = require('handlebars');

var PRODUCTION = 'production';

module.exports = function(options) {

  var env = process.env.BROCCOLI_TACO_ENV;
  if (env !== PRODUCTION) {
    console.info('env ', env);

    var template =
    "<div id=\"disqus_thread\">dev disqus placeholder</div>";
    var compiledTemplate = Handlebars.compile(template);
    return new Handlebars.SafeString( compiledTemplate() );
  }

  var template =
  "<div id=\"disqus_thread\"></div>" +
  "<script>" +
  "var disqus_shortname = '{{shortname}}';" +
  "var disqus_identifier = '{{identifier}}';" +
  "var disqus_title = '{{title}}';" +
  
  "(function() {" +
      "var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;" +
      "dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';" +
      "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);" +
  "})();" +
  "</script>";

  var compiledTemplate = Handlebars.compile(template);
  var data = {
    shortname: 'givanse', 
    identifier: options.hash.identifier,
    title: options.hash.title
  };

  return new Handlebars.SafeString( compiledTemplate(data) );
};
