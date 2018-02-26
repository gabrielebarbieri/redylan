# Redylan

> Remixing dylan lyrics with style using constrained markov process https://redylan.neocities.org


![Redylan](https://raw.github.com/gabrielebarbieri/redylan/master/screenshot.png)

Redylan is an implementation of the research I did during my Ph.D. thesis. It uses artificial intelligence techniques to model the style of Bob Dylan as a mathematical model. Such a model can generate new lyrics in the style of Bob Dylan, controlled by high-level parameters (lyrics' theme and rhyme scheme) chosen by the user.

For more details about the algorithm, check this paper: [Markov Constraints for Generating Lyrics with Style](https://www.csl.sony.fr/downloads/papers/2012/barbieri-12a.pdf).

Redylan is single page application written in [Vue.js](https://vuejs.org/). The particularity of Redylan is that it is a pure frontend application, meaning that there is not a backend server generating the lyrics. All the computations are done in your browser in a background thread by a dedicated [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

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
