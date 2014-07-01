#!/bin/bash

set -e

dist=../hg-www

ember build --output-path $dist

cd $dist

git init

git remote add hostgator-www givanse@givan.se:www/

git add .

git commit -m 'automated deploy'

git push -u -f hostgator-www master

exit
#EOF
