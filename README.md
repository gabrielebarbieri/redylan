# Redylan

> Remixing dylan lyrics with style using constrained markov process https://redylan.neocities.org

# Todo
* Fill How it works page
* Improve ths README

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deployment

Redylan is hosted on the wonderful service [Neocities](https://neocities.org/). To deploy it you need to install the [Neocities CLI](https://neocities.org/cli).

``` bash
# Go to the project root and erase the dist folder for a clean new build
rm -rf dist

# Build for production 
npm run build

# Go inside the dist fodler
cd dist

# Delete older sources from neocities
neocities delete static
neocities delete *.worker.js

# Push the build
neocities push .
```