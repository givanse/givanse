#!/bin/bash

set -e

distFolder='dist'

rm -rvf $distFolder

BROCCOLI_ENV=production
BROCCOLI_TACO_ENV=production
broccoli-taco build $distFolder

# fake "redirect"
cp -v $distFolder/about/index.html $distFolder

echo -e '\nbuild complete'

exit
#EOF
