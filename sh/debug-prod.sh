#!/bin/bash

set -e

./precompile-templates.sh

ember build --environment='production'

echo `date` >> dist/index.html

sudo cp -Rv dist/* /var/www/

exit
#EOF
