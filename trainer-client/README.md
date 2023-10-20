
# electron-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install electron -g
npm install

# serve with hot reload at localhost:8080
npm run dev

Issue: Error: listen EADDRINUSE :::8080

https://github.com/webpack/webpack-dev-server/issues/860

https://github.com/webpack/webpack-dev-server/issues/1093

> Open it with windows prompt fro CTRL+C to work properly

or

Windows inside GitBash terminal / Webstorm Terminal I needed to use this solution.

> cmd "/C TASKKILL /IM node.exe /F"

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# run electron app
electron .

```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
