/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'givanse',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      disqus: {
        shortname: 'givanse'
      },
      path: {
        posts: 'posts/',
        posts_list: 'posts/posts.json'
      }
    },

    contentSecurityPolicy: {
      'report-uri': ["http://localhost:4200"],
      // Raphael uses unsafe-eval
      'script-src': [
        "'self'",
        "'unsafe-eval'", 
        "'unsafe-inline'", 
        "http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js",
        "http://www.google-analytics.com/analytics.js",
        "http://givanse.disqus.com/embed.js",
        "http://a.disquscdn.com/embed.js"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'frame-src': ["'self'", "http://disqus.com"]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';
 
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
