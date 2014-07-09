#!/bin/bash

set -e

# Place everything outside the project folder.
# That allows me to setup the $dist folder as a new git project.
dist=../hg-www
#ember build --environment='production' --output-path $dist
ember build --output-path $dist

cd $dist

echo '<!-- '`date`' -->' >> index.html

git init

git remote add hostgator-www givanse@givan.se:www/

git add .

git commit -m 'automated deploy'

git push -u -f hostgator-www master

exit
#EOF
