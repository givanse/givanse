#!/bin/sh

mkdir pages/$1
touch pages/$1/data.js
touch pages/$1/index.hbs
echo "<h1>$1</h1>" > pages/$1/index.hbs
