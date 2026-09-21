# Harry's personal website

This website was written by Harry Tong in React. It was bootstrapped with `create-react-app`. If you would like to use this code, please ask nicely and I might say yes. Find the live site [here](https://harrytong.com).

Install packages (Font Awesome Pro needs `FONTAWESOME_NPM_AUTH_TOKEN` set in your shell; `.npmrc` reads it):
```sh
yarn
```

Run site locally:
```sh
yarn start
```

Deploy (Cloudflare Workers; config in `wrangler.jsonc`, `/api/*` handled by `worker/index.js`):
```sh
yarn deploy
```
