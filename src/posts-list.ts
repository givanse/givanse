const postsList: Array<Post> = [
  {
    draft: true,
    fileName: '',
    title: 'STL Viewer and GlimmerJS example',
    created: '',
    updated: '',
    description: '',
    keywords: 'GlimmerJS, STL Viewer, 3D',
    hashtags: '',
    thumb: ''
  },
  {
    fileName: 'build-test-deploy-bitcoin-on-monterey',
    title: 'Build, test and deploy Bitcoin on Mac',
    created: '19/Feb/2022',
    updated: '',
    description: 'How to download, build, test and deploy Bitcoin on macOS 12.2.1 (Monterey).',
    keywords: 'Bitcoin, Compile, Mac',
    hashtags: 'bitcoin,compile',
    thumb: '/img/bitcoin.png'
  },
  {
    fileName: 'umbrel-ubuntu',
    title: 'How to set up an Umbrel node on Ubuntu',
    created: '19/Dec/2021',
    updated: '',
    description: 'Guide to setting up a Bitcoin full node and lightning node with Umbrel on Ubuntu.',
    keywords: 'Umbrel, Ubuntu, Bitcoin',
    hashtags: 'Bitcoin,Full Node',
    thumb: '/img/umbrel-ubuntu.jpg'
  },
  {
    external: true,
    externalUrl: 'https://www.leagueoflegends.com/en-us/news/dev/introducing-the-client-cleanup-campaign/',
    fileName: '',
    title: 'Introducing the client cleanup campaign',
    created: '02/Mar/2020',
    updated: '',
    description: "Over the next six months or so we'll ship a number of changes and improvements to the League client's backend infrastructure. To track our process, we'll be sharing specific targets for two main client performance metrics: client bootstrap time and champ select lock-in time.",
    keywords: 'LoL, Performance, UX',
    hashtags: 'LoL,Client',
    thumb: ''
  },
  {
    fileName: 'how-to-add-tailwindcss-to-preact-cli',
    title: 'How to add Tailwind CSS to Preact CLI',
    created: '31/Oct/2019',
    updated: '',
    description: 'Add Tailwind CSS to an existing Preact CLI application through PostCSS.',
    keywords: 'preact-cli, tailwindcss',
    hashtags: 'Preact',
    thumb: ''
  },
  {
    fileName: 'vscode-breakpoints',
    title: 'VSCode breakpoints not working',
    created: '09/Jul/2019',
    updated: '',
    description: 'VSCode breakpoints or debugger statements are not hit, why?',
    keywords: 'VSCode, npm, debug',
    hashtags: 'VSCode,npm',
    thumb: ''
  },
  {
    fileName: 'tetris-lol',
    title: 'Tetris LoL',
    created: '13/May/2017',
    updated: '',
    description: 'Tetris game theme based on League of Legends, without JQuery!',
    keywords: 'Tetris, League of Legends',
    hashtags: 'Tetris,LeagueOfLegends',
    thumb: '/img/tetris_lol_th.png'
  },
  {
    fileName: 'when-ember-observer-should-be-used',
    title: 'When Ember.observer should be used?',
    created: '3/Oct/2016',
    updated: '',
    description: 'Lots of observers can be the source of hard to debug issues and they can have a big impact on the performance of your app. You should avoid them as much as possible.',
    keywords: 'Ember, Observer',
    hashtags: 'emberjs',
    thumb: '/img/encom-os12.jpg'
  },
  {
    fileName: 'broccolijs-from-scratch',
    title: 'Broccoli.js from scratch',
    created: '19/Apr/2015',
    updated: '29/Aug/2016',
    description: 'We\'ll install and configure Broccoli using a hello world website. Then we\'ll add a couple of Broccoli plugins for common tasks like loading assets and bundling CSS.',
    keywords: 'Broccoli.js',
    hashtags: 'broccolijs',
    thumb: '/img/encom-os12.jpg'
  },
  {
    fileName: 'where-is-the-ember-community',
    title: 'Where is the Ember community?',
    created: '04/Aug/2015',
    updated: '',
    description: 'A collection of places and channels where embereños help each other.',
    keywords: 'Ember, Community, Resources',
    hashtags: 'emberjs,community',
    thumb: '/img/ember-community.jpg'
  },
  {
    fileName: 'centos-nginx-rails-mysql-ember',
    title: 'CentOS Nginx Rails MySQL Ember',
    created: '23/Jul/2015',
    updated: '',
    description: 'Setup a Rails and MySQL backend with an Ember frontend in a CentOS box using Nginx.',
    keywords: 'CentOS, Nginx, Rails, MySQL, Ember, Ruby',
    hashtags: 'nginx, emberjs, rails',
    thumb: '/img/encom-os12.jpg'
  },
  {
    fileName: 'spree-quickstart',
    title: 'Spree Quickstart',
    created: '12/Jul/2015',
    updated: '',
    description: 'How to quickly get started with Spree on Rails.',
    keywords: 'Rails, MySQL, Spree',
    hashtags: 'spree, rails',
    thumb: ''
  },
  {
    external: true,
    externalUrl: 'https://hacks.mozilla.org/2015/06/es6-in-depth-babel-and-broccoli/',
    fileName: '',
    title: 'ES6 In Depth: Using ES6 today with Babel and Broccoli',
    created: '17/Jun/2015',
    updated: '',
    description: 'ES6 In Depth is a series on new features being added to the JavaScript programming language in the 6th Edition of the ECMAScript standard, ES6 for short.',
    keywords: 'ES6, transpiler, ECMAScript, BroccoliJS',
    hashtags: 'es6, broccolijs',
    thumb: ''
  },
  {
    fileName: 'do-not-sudo-npm',
    title: 'Do not sudo npm',
    created: '11/Jun/2015',
    updated: '',
    description: 'Using root privileges with npm is not recommended, we\'ll go through the reasons. Avoid common pitfalls and learn the options for a proper installation of npm.',
    keywords: 'npm, sudo, security',
    hashtags: 'npm, security',
    thumb: '/img/sudo.jpg'
  },
  {
    fileName: 'ember-podcasts-list',
    title: 'A list of Ember podcasts',
    created: '11/Jun/2015',
    updated: '',
    description: 'Have a quick overview of the four Ember podcasts that are out there and a small list of selected Ember episodes.',
    keywords: 'Ember.js, Podcast, Ember news, Ember tooling',
    hashtags: 'emberjs, podcast',
    thumb: '/img/podcast.jpg'
  },
  {
    fileName: 'sane-auth-example',
    title: 'Sane-Auth example',
    created: '03/Jun/2015',
    updated: '',
    description: 'Authenticate an Ember app with a Sails API using sane-auth. This setup is based on JSON Web Token (JWT) and OAuth2.',
    keywords: 'Ember.js, Sails.js, Sane Stack, Authentication, JWT, OAuth2',
    hashtags: 'emberjs, sailsjs',
    thumb: '/img/sails-ember-th.jpg'
  },
  {
    fileName: 'ember-and-sails-authentication-options',
    title: 'Ember and Sails authentication options',
    created: '15/May/2015',
    updated: '',
    description: 'What are the possible ways of authenticating an Ember app with a Sails backend? This is an overview of the current offer of tools and addons available for session and token based authentication.',
    keywords: 'Ember.js, Sails.js, Sane Stack, Authentication',
    hashtags: 'emberjs, sailsjs',
    thumb: '/img/sails-ember-th.jpg'
  },
  {
    fileName: 'ember-i-choose-you',
    title: 'Why I use Ember.js?',
    created: '31/Mar/2015',
    updated: '04/Aug/2015',
    description: 'Ember is much more than a JavaScript Framework. A whole ecosystem has been born around it. So, putting aside technical aspects, what is good about Ember.js?',
    keywords: 'Ember.js',
    hashtags: 'emberjs',
    thumb: '/img/givanse.jpeg'
  },
  {
    fileName: 'mvc-past-present-and-future',
    title: 'MVC past, present and future.',
    created: '07/Aug/2014',
    updated: '',
    description: 'Let\'s untangle MVC as engineering jargon, a design pattern and a family of designs. The terms Model, View, and Controller suffer from semantic overload, mainly because they are not written and then read under the same context.',
    keywords: 'MVC',
    hashtags: 'MVC, Software Patterns, UI',
    thumb: '/img/control_tower.jpg'
  },
  {
    fileName: 'ember-cli-phonegap',
    title: 'Ember CLI & Phonegap',
    created: '09/Jul/2014',
    updated: '',
    description: 'Place an Ember CLI app, version 0.1.1 or lower, inside a Phonegap app.',
    keywords: 'Ember CLI, Phonegap',
    hashtags: 'emberjs, phonegap',
    thumb: '/img/encom-os12.jpg'
  },
  {
    fileName: 'ember-cli-simple-auth-devise',
    title: 'Ember CLI & ember-simple-auth-devise',
    created: '16/Jun/2014',
    updated: '20/Oct/2014',
    description: 'Step by step guide that shows you how to authenticate to a Rails/Devise server from an Ember CLI app. We will build a Rails project and an Ember project from scratch.',
    keywords: 'Ember CLI, Rails, Authentication',
    hashtags: 'emberjs, rails',
    thumb: '/img/encom-os12.jpg'
  }
];

export default postsList;