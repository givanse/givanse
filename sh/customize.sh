#!/bin/bash

set -e

# syntax highlight
cd bower_components/SyntaxHighlighter/
npm install
bower install
mkdir components
cd components
git clone https://github.com/slevithan/xregexp.git
cd -
grunt build

exit
#EOF
