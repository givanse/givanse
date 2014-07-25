#!/bin/bash

set -e

npm install
bower install

cd vendor/SyntaxHighlight
npm install
bower install
mkdir components
cd components
git clone https://github.com/slevithan/xregexp.git
cd -
grunt build

exit
#EOF
