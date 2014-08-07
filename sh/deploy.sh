#!/bin/bash

set -e

# Setup an Ember project in Hostgator and push changes with git
# https://gist.github.com/givanse/85d5f520e9e6bfbdfbc2

killall -9 ember || true

./sh/precompile-templates.sh

# Place everything outside the project folder.
# That allows me to setup the $dist folder as a new git project.
dist=../givanseProd
ember build --environment='production' --output-path $dist

cd $dist

timestamp=`date` 
echo '<!-- '$timestamp' -->' >> index.html

git init

git remote add origin givanse@givan.se:www/

git add .
git commit -m 'automated deploy'

git push -u -f origin master

exit
#EOF
