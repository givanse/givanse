#!/bin/bash

set -e

ghpages=../givanse-gh-pages/

rm -rv dist/
BROCCOLI_TACO_ENV=production broccoli-taco build dist/

cp -vR dist/* $ghpages

cd $ghpages

git status

git add -u .

git commit -m 'automated deploy'

git push -u origin gh-pages 

exit
#EOF
