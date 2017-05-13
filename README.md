   
https://givan.se

Pushing to master triggers the deploy job.

```
nvm use 0.10
./install-deps.sh
broccoli-taco serve
```

Build

```
ENV=development ./build.sh
npm run build-dev

ENV=production ./build.sh
npm run build
```


```
npm run build-serve
```
