#!/bin/bash

set -e

ghPagesFolderPath='../givanse-gh-pages'

mkdir $ghPagesFolderPath
cd $ghPagesFolderPath

git init
git remote add origin git@github.com:givanse/givanse.git 
git checkout -b gh-pages
git pull origin gh-pages

