# References

ng.cmd new eshop --skip-tests

## Angular firbase
https://console.firebase.google.com/u/0/project/eshop-bad23/overview

https://javascript.plainenglish.io/set-up-firebase-in-your-angular-app-for-the-first-time-79e0875e504b

https://stackoverflow.com/a/69132452/9229695
```
npm install firebase @angular/fire

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

AngularFireModule.initializeApp(environment.firebaseConfig)
```

## Bootstrap
```
npm install bootstrap

@import '~bootstrap/dist/css/bootstrap.css'
```