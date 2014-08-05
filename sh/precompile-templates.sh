#!/bin/bash

set -e

origin='posts_templates/'
destination='public/posts/'

ls $origin

path='\(.*\/\)'
name='\([0-9]*\)'
ext='\(\.hbs\)'

for filename in $origin*.hbs
do
  # generate the name for output file
  #output_file=`echo $filename | cut -d '.' -f 1`'.js'
  output_file=`echo $filename | sed "s/$path$name$ext/\2/g"`'.js'
  output_path=$destination$output_file

  # precompile
  echo 'ember-precompile' $filename '-f' $output_path
  ember-precompile $filename -f $output_path
done

exit
#EOF
