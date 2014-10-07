#!/bin/bash

# execute from the root folder, examples:
# ./sh/precompile_templates
# ./sh/precompile-templates.sh posts_templates/00000011.hbs

set -e

origin='posts_templates/'
destination='public/posts/'


rx_path='\(.*\/\)'
rx_name='\([0-9]*\)'
rx_ext='\(\.hbs\)'

function precompile_file {
  filename=$1

  # generate the name for output file
  #output_file=`echo $filename | cut -d '.' -f 1`'.js'
  output_file=`echo $filename | sed "s/$rx_path$rx_name$rx_ext/\2/g"`'.js'
  output_path=$destination$output_file

  # precompile
  echo 'ember-precompile' $filename '-f' $output_path
  ember-precompile $filename -f $output_path
}


if [ $1 ]
then
  # Single template
  echo 'precompile single template'
  echo 'template: '$1
  precompile_file $1
else
  # All templates
  echo 'precompile all the templates'
  ls $origin
  for filename in $origin*.hbs
  do
    precompile_file $filename
  done
fi

exit
#EOF
