#!/bin/bash

set -e

distFolder='dist'

rm -rvf $distFolder

BROCCOLI_TACO_ENV=production broccoli-taco build $distFolder

# add "redirect"
cd dist
rm index.html
ln -vs about/index.html index.html
cd -

exit
#EOF
