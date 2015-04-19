#!/bin/bash

set -e

ghpages=../givanse-gh-pages

distFolder='dist/'

rm -rv $distFolder
BROCCOLI_TACO_ENV=production broccoli-taco build $distFolder

rm -vf $ghpages'/*.css'
rm -vf $ghpages'/*.js'

cp -vR dist/* $ghpages

cd $ghpages

git add -A

echo -e '\nSTATUS'
git status

git commit -m 'automated deploy'

git push -uf origin gh-pages 

exit
#EOF
