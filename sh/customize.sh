#!/bin/bash

set -e

npm installi -g grunt-cli
npm install -g ember-precompile

npm install
bower install

# syntax highlight
cd vendor/SyntaxHighlighter/
npm install
bower install
mkdir components
cd components
git clone https://github.com/slevithan/xregexp.git
cd -
grunt build

exit
#EOF
