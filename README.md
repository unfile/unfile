# UnFile

## Required environment variables
rename `.env.example` file to `.env` and paste your Web3.Storage token

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [nuxt documentation](https://nuxtjs.org).

## Web3.Storage
The web3.storage library is included due to a problem compiling with nuxt as [described here](https://github.com/web3-storage/web3.storage/issues/260)

once the problem is fixed the normal Web3.Storage library from npm should be used instead.