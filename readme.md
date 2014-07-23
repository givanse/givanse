
npm install
bower install
npm install --save-dev broccoli-less-single

cd vendor/SyntaxHighlight
npm install
bower install
mkdir components
cd components
git clone https://github.com/slevithan/xregexp.git
cd -
grunt build
