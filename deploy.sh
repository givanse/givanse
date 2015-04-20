#!/bin/bash

set -e

ghpages=../givanse-gh-pages

distFolder='dist'

./build.sh

rm -vf $ghpages'/*.css'
rm -vf $ghpages'/*.js'

cp -vR $distFolder'/*' $ghpages

cd $ghpages

git add -A

echo -e '\nSTATUS'
git status

git commit -m 'automated deploy'

git push -uf origin gh-pages 

exit
#EOF
