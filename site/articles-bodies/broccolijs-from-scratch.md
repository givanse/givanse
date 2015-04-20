
All the code for this example can be found here:
[broccolijs-from-scratch](https://github.com/givanse/broccolijs-from-scratch)

## Requirements

Install Node and npm.

```
node -v
v0.10.38
npm -v
1.4.28

```
```
npm install -g broccoli-cli
```

## Project setup

    mkdir broccolijs-from-scratch
    cd broccolijs-from-scratch
    npm init

Answer the questions and the result will be the file `package.json`.

## Install Broccoli

    # broccolijs-from-scratch/
    npm install --save-dev broccoli
    touch Brocfile.js

Create an `index.html` file.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>broccolijs-from-scratch</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <h1>Broccoli.js hello world</h1>
    </body>
</html>
```

### Config Broccoli

We will install a Broccoli plugin and use it to build the website.

    npm install --save-dev broccoli-funnel

In `Brocfile.js` add:

```js
var funnel = require('broccoli-funnel');

var html = funnel('.', {
  files   : ['index.html'],
  destDir : '/'
});

module.exports = html;
```

Save and build

    broccoli build dist

Open in you browser the file `dist/index.html` and you'll see:

> Broccoli.js hello world

## Adding Styles

Two plugins will be installed:

    npm install --save-dev broccoli-concat
    npm install --save-dev broccoli-merge-trees

We add the file `style.css` with:

```css
body {
  margin: 30px;
  border: 1px solid black;
}
```

In `Brocfile.js` we add:

```js
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');

var styles = concat('.', {
               inputFiles : ['style.css'],
               outputFile : '/site.css'
             });

module.exports = mergeTrees([html, styles]);
```

The final CSS file must be included in `index.html`:

    <link rel="stylesheet" href="site.css">

Rebuild and verify the changes:

    rm -r dist/ && broccoli build dist
    # visit dist/index.html

## Fontello

We'll add a third party stylesheet that makes use of font files.

In `index.html` add:

    <i class="icon-emo-grin red"></i></a>
    <i class="icon-emo-grin green"></i></a>
    <i class="icon-emo-grin blue"></i></a>

In `style.css` add:

```css
.red, .green, .blue {
  font-size: 7rem;
}

.red {
  background-color: red;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
```

In `Brocfile.js` add:

```js
var styles = concat('.', {
               inputFiles : ['style.css',
                             'fontello/css/fontello.css'],
               outputFile : '/site.css'
             });

var fonts = funnel('fontello/font', {
  files   : ['fontello.woff',
             'fontello.ttf'],
  destDir : '/font'
});

module.exports = mergeTrees([html, styles, fonts]);
```

### Download Fontello files

Use [fontello-config.json](https://raw.githubusercontent.com/givanse/broccolijs-from-scratch/master/fontello-config.json)
to download the font files from [fontello.com](http://fontello.com/) and within the project folder:

    unzip fontello-703c13a3.zip
    mv fontello-703c13a3/ fontello

This time a server will be needed for us to see the changes:

    broccoli serve
    # visit http://localhost:4200/

## Final note

I used an old Node version because the command `broccoli serve` wouldn't work as I expected in 0.11 and 0.12,
but `broccoli build` works just fine, which is what really matters.

One trick to test your project from the `dist/` folder is to start a server from there:

    cd dist/
    python -m SimpleHTTPServer
    # visit http://localhost:8000/
