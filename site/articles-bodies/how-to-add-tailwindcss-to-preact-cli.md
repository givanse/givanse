
The steps documented here were executed with the latest release of preact-cli:

 - preact-cli 2.1.0
 - preact 8.5.2

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

You'll notice that the `config` object is the Webpack config and that you can just mess with it directly, instead of using `getLoadersByName`.
However, it is usually better to stick to the public APIs that Preact CLI offers, or any tool. So that upgrades are easier in the future.

Now you can create your own classes using Tailwind's utilities:

```
.some-class {
  @apply text-gray-700;
}
```

Full code example: [add tailinwdcss through postcss](https://github.com/givanse/btc-scarcity/commit/3889ec766c576220073e187baf1790776f33988b)

