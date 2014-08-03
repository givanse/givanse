#!/bin/bash

set -e

cd public/posts_templates/
ls

for filename in *.hbs
do
  # generate the output file name
  output_file=`echo $filename | cut -d '.' -f 1`'.js'
  echo $filename ' => ' $output_file

  # precompile
  ember-precompile $filename -f $output_file
done

exit
#EOF
