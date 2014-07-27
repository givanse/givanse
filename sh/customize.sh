#!/bin/bash

set -e

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

# bootstrap
mkdir vendor/bootstrap
cd vendor/bootstrap/
mv ~/Downloads/bootstrap.zip . 
unzip bootstrap.zip

exit
#EOF
