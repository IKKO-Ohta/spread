/* eslint-disable no-console */
// https://qiita.com/Hiroyuki1993/items/1ab9266ca6fc422113e3
// thank you.

import * as functions from 'firebase-functions'
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

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
    subject: 'spreadにようこそ！',
    html: `こんにちは! <br/> あなたは対戦管理ツールspreadから招待を受け取っています。<br/> 招待を受け取っているspreadのURLは以下のとおりです。<br/>${data.url}<br/> *本メールに心当たりがない場合は開かないでください。`
  }
  mailTransport.sendMail(email, (err: Error, _info: any): void => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
})
