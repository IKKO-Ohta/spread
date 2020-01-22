# firebase functions 
This application use Firebase Functions.

1. write `index.ts` as follows.
2. create a new gmail account for this application.
3. deploy this to Firebase Functions.

[Firebase Funtions official tutorial](https://firebase.google.com/docs/functions/get-started?hl=ja#review_complete_sample_code)

## index.ts
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