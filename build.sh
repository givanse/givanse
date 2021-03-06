#!/bin/bash

set -e

distFolder='dist'

rm -rvf $distFolder
rm -rvf tmp

BROCCOLI_ENV=$ENV BROCCOLI_TACO_ENV=$ENV ./node_modules/.bin/broccoli-taco build $distFolder

echo -e '\nbuild complete'

echo -e '\ngenerating sitemap'

cd dist

../node_modules/sitemap-static/index.js --prefix=https://givan.se/ . > sitemap.xml

ls -l sitemap.xml

exit
#EOF
