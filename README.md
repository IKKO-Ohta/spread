# spread

> helps to gamerecords

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Dependency

Node.js 12.13.1

## Setup firebase

This app depends on firebase cloud Firestore.
https://firebase.google.com/docs/web/setup

```
$ yarn global add firebase-tools
$ firebase login
$ firebase init
  ... services => firestore, hosting(recommend)
  ... public directory => dist
```

Please add `credentials/firebase.ts`.
you can get your firebase credential data from the following page.
https://console.firebase.google.com/project/{your-project-name}/settings/general/

This app loads the object with export default.

```bash
$ mkdir credentials
$ cd credentials
$ emacs firebasekey.ts

example:

# export default {
#  apiKey: *** ,
#  authDomain: ***,
#  databaseURL: ***,
#  projectId: ***,
#  storageBucket: ***,
#  messagingSenderId: ***,
#  appId: ***,
#  measurementId: ***
# }

```

## Deploy

```bash
$ yarn run generate
$ firebase deploy
```
