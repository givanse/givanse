
Install Tailwind:

```
yarn add -D tailwindcss 
```

[Generate a tailwindcss config](https://tailwindcss.com/docs/installation/#3-create-your-tailwind-config-file-optional):

```
npx tailwind init
```

In your app folder create the file `preact.config.js` if you don't have one yet. Add to it the following code:

```
  const results = helpers.getLoadersByName(config, 'postcss-loader');
  for (const result of results) {
    result.loader.options.plugins = [
      tailwindcss('./tailwind.config.js'),
      // other postcss plugins can be added here
      ...result.loader.options.plugins
    ];
  }
```

Full code example: [add tailinwdcss through postcss](https://github.com/givanse/btc-scarcity/commit/3889ec766c576220073e187baf1790776f33988b)

