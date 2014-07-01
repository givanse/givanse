#!/bin/bash

set -e

# git remote add hostgator-www givanse@givan.se:www/

dist=../hg-www

ember build --output-path $dist
cd $dist

git add -u .

git commit -m 'automated deploy'

git push -u hostgator-www master

exit
#EOF
