# Setup firebase

## install firebase cli
This app depends on firebase cloud Firestore.
https://firebase.google.com/docs/web/setup

```
$ yarn global add firebase-tools
$ firebase login
$ firebase init
  ... services => firestore, hosting, functions
  ... public directory => dist
```

Please add `credentials/firebase.ts`.  
You can get your firebase credential data from the following page.
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

## setting firebase cloudstore rules
Here is the recomended rule. copy and paste it in your `firestore.rules`.  `firebase deploy` command applies the file to your firebase database rules.


### firestore.rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sheet/{sheetName} {
      allow read;
      allow write: if request.auth.token.email != null
    }
    match /sheet/{sheetName}/games/{game} {
      allow read, write: if request.auth.token.email in get(/databases/$(database)/documents/sheet/$(sheetName)).data.members;
    }
  }
}
```

### setting firebase functions 
This application use Firebase Functions.

1. write `index.ts` as follows.
2. create a new gmail account for this application.
3. deploy this to Firebase Functions.

[Firebase Funtions official tutorial](https://firebase.google.com/docs/functions/get-started?hl=ja#review_complete_sample_code)

### functions/src/index.ts
```typescript

// https://qiita.com/Hiroyuki1993/items/1ab9266ca6fc422113e3
// thank you.

import * as functions from 'firebase-functions'
const nodemailer = require('nodemailer')
const gmailEmail = 'spam' // <= fill in
const gmailPassword = 'ham' // <= fill in

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

exports.sendMail = functions.https.onCall((data, _context): void => {
  const email = {
    from: gmailEmail,
    to: data.destination,
    subject: 'Welcome to spread!',
    text: `You received an invitation to spread! Let's share game records with your team. Here is the sheet url: ${data.url}`
  }
  mailTransport.sendMail(email, (err: any, _info: any): void => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
})


```

### Deploy

```bash
$ yarn generate
$ firebase deploy
```
