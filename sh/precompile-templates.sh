#!/bin/bash

set -e

cd public/posts_templates/
ls

for filename in *.hbs
do
  outputf=`echo $filename | cut -d '.' -f 1`'.js'
  echo $filename ' => ' $outputf
  ember-precompile $filename -f $outputf
done

exit
#EOF
