#!/bin/bash

set -e

distFolder='dist/'

rm -rv $distFolder

broccoli-taco build $distFolder

exit
#EOF
