
https://github.com/ember-cli/ember-cli-update#installation

## Take 2

```
nvm install 8
npm install -g ember-cli-update
ember-cli-update --to 3.0

# apply in stages
ember-cli-update --run-codemods

# check everything works
ember test
ember start
```

Rinse and repeat
```
nvm install 14
npm install -g ember-cli-update
ember-cli-update
```

https://ember-learn.github.io/ember-octane-vs-classic-cheat-sheet/


## Does it run?

https://github.com/ember-cli/ember-cli/blob/master/docs/node-support.md

https://github.com/ember-cli/ember-cli/issues/7518#issuecomment-365665702

```
nvm install 8
```

> Could not find module `ember-resolver` imported from `AppName/resolver Ember tests

```
npm cache clear && bower cache clean && rm -rf node_modules bower_components && npm install && bower install
```

```
not ok 1 [undefined ms] - SyntaxError
    ---
        message: >
            Unexpected token ...
    ...
```
npm install --save-dev @babel/core@^7.0.0-beta.42 ember-cli-babel@6.18.0


