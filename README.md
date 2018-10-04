<h1 align="center">react-ur</h1>

<div align="center">React universal renderer.</div>

<br />

react-ur makes your Universal React development flow easier with fantastic tools.

## Features

- HMR(+ Server-Side routes hot reloading) Included :heart:
  - with [koa](https://github.com/koajs/koa)
  - based on [ultimate-hot-reloading-example](https://github.com/glenjamin/ultimate-hot-reloading-example)
- Do SEO (google) and SMO (twitter, facebook...) for React app.
  - with [react-helmet](https://github.com/nfl/react-helmet)
- No complex routing logic needed anymore! (Will just render page in the `/routes`)
- [next.js](https://github.com/zeit/next.js/) inspired `getInitialProps` lifecycle.
- No brain clutter configuration. Just run these commands for `building bundle, starting dev-server/prod-server`
  - `rur start` -> Start webpack-dev-server and /server script with ES6/ESM feature enabled :heart_eyes:
  - `rur build` -> Build client via webpack and Transpile /server scripts for Production via babel

## How to try

```
# Go to example app
cd examples/simple

# Install dependencies
npm i

# Start development server/client
npm run serve

# Build production server/client
npm run build

# Start production server (with bundled client-js)
npm run servep
```

## Packages

this repo is monorepo, contains following packages.

- [react-ur](https://github.com/subuta/react-ur/tree/master/packages/react-ur) Client(Browser) & Server react renderer.
- [react-ur-tools](https://github.com/subuta/react-ur/tree/master/packages/react-ur-tools) Webpack(for Client) & Babel(for Server) based easy to use dev-tools.

## License

MIT © [subuta](https://github.com/subuta)