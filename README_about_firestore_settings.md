
## firestore.rules
Here is the recomended rule. copy and paste it in your `firestore.rules`.  `firebase deploy` command applies the file to your firebase database rules.

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

