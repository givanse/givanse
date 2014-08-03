#!/bin/bash

set -e

# Needs:
# ~/.ssh/config
# Host your-domain.com
#   Port 2222
#   PreferredAuthentications publickey

./sh/precompile-templates.sh

# Place everything outside the project folder.
# That allows me to setup the $dist folder as a new git project.
dist=../hg-www
ember build --environment='production' --output-path $dist

cd $dist

echo '<!-- '`date`' -->' >> index.html

git init

git remote add hostgator-www givanse@givan.se:www/

echo 'posts_templates/*.hbs' >> .gitignore

git add .

git commit -m 'automated deploy'

git push -u -f hostgator-www master

exit
#EOF
