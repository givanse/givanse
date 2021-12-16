## Creating two projects

Create an Ember project and inside create the Phonegap project.

```bash 
# Ember
ember new cool-app
cd cool-app/
ember build --environment='production'

# Phonegap
phonegap create phonegap/ com.companyname.cool-app cool-app
```

<p>If you want to debug the Ember app within Phonegap, remove the `--environment` flag, it will default to "development".</p>

## Copying from Ember to Phonegap

<p>Copy your Ember assets to Phonegap.</p>

    #cool-app/
    cp -vR dist/assets/ phonegap/www/

<p>Add the links to the assets files.</p>

In `cool-app/phonegap/www/index.html`

    <link rel="stylesheet" href="assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css">
    <link rel="stylesheet" href="assets/cool-app-de3c495d5da3bffcdc865aaa60f76ab3.css">
    <title>Hello World</title>

    <script src="assets/vendor-0815f45d85c20b590175f7a4e843eb21.js"></script>
    <script src="assets/cool-app-201c7a50ebb6db2e54e2d5bc2b255762.js"></script>
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="js/index.js"></script>

<p>
Initialize the Ember app in the `onDeviceReady` event handler. 
The statements were copied from dist/index.html.
</p>

In `cool-app/phonegap/www/js/index.js`, remove:

```js
var parentElement = document.getElementById(id);
var listeningElement = parentElement.querySelector('.listening');
var receivedElement = parentElement.querySelector('.received');

listeningElement.setAttribute('style', 'display:none;');
receivedElement.setAttribute('style', 'display:block;');
```

And add:

```js
window.CoolAppENV = {"environment":"production","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{}};
window.EmberENV = window.CoolAppENV.EmberENV;
window.CoolApp = require('cool-app/app')['default'].create(CoolAppENV.APP);
```

<p>
The real trick comes here, we have to change the way Ember will look for routes and assets.
We have to delete <b>baseURL</b> and change <b>locationType</b> to "none".
</p>  

in `cool-app/phonegap/www/js/index.js`

```js
- window.CoolAppENV = {"environment":"production","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{}};
+ window.CoolAppENV = {"environment":"production","locationType":"none","EmberENV":{"FEATURES":{}},"APP":{}};
```

## Testing it

<p>
Note that I haven't covered how to install an SDK. 
You'll have to do that or connect an actual device, depending on how you want to test the app.
</p>

    # cool-app/
    cd phonegap/
    phonegap run android

<p>
You should see now, in the upper left corner, a tiny message: 
</p>

<blockquote>
  <b>Welcome to Ember.js</b>
</blockquote>
