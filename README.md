# References

ng.cmd new eshop --skip-tests

## Bootstrap
```
npm install bootstrap

@import '~bootstrap/dist/css/bootstrap.css';
```

## Angular material
https://youtu.be/jUfEn032IL8
```
ng.cmd add @angular/material
```

## Firebase deployment
```
firebase.cmd login
firebase.cmd init
ng.cmd build
firebase.cmd deploy
```

## Angular firbase compatibility mode
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


<!-- ## angular firebase new v7
https://github.com/angular/angularfire/issues/3028

https://dev.to/jdgamble555/angular-12-with-firebase-9-49a0

https://www.npmjs.com/package/@angular/fire
```
ng.cmd add @angular/fire
ng.cmd deploy
``` -->

## Authentication compat mode
https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md