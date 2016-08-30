
All the code for this example can be found here:
[broccolijs-from-scratch](https://github.com/givanse/broccolijs-from-scratch)

## Requirements

Install Node.

```
node -v
v6.2.1

npm -v
3.9.3
```

## Project setup

```
mkdir broccolijs-from-scratch
cd broccolijs-from-scratch
npm init
```

Answer the questions and the result will be the file `package.json`.

## Install Broccoli

    # broccolijs-from-scratch/
    npm install -g broccoli@1.0.0-beta.7
    npm install --save-dev broccoli

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

We will install a Broccoli plugin that allows us to load files into
Broccoli trees.

    npm install --save-dev broccoli-funnel

Create the file `Brocfile.js` and add:

```js
var funnel = require('broccoli-funnel');

// the variable `html` now holds a Broccoli tree
var html = funnel('.', {
  files   : ['index.html'],
  destDir : '/'
});

module.exports = html;
```

Save the file and build the site:

```
broccoli build dist
```

Open in you browser the file `dist/index.html` and you'll see:

> Broccoli.js hello world

## Adding Styles

We'll install two Broccoli plugins:

```
# concatenates the files in a Broccoli tree
npm install --save-dev broccoli-concat

# allows us to merge two Broccoli trees into one
npm install --save-dev broccoli-merge-trees
```

We add the file `style.css` with:

```css
body {
  margin: 30px;
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

This time a server will be needed for us to see the changes:

```
broccoli serve
# visit http://localhost:4200/
```
