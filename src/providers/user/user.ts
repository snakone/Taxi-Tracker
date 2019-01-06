import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';

@Injectable()
export class UserProvider {

  user: any = {};
  code: number;

  document: Subscription;

  constructor(private db: AngularFirestore,
              private storage: Storage,
              private platform: Platform) {
    
  }

  verifyUser(code: number): Promise<any> {
    return new Promise((res, rej) => {
      this.document = this.db.doc(`users/${code}`)
       .valueChanges().subscribe(data => {
         if (data) {
          this.code = code;
          this.user = data;
          this.saveCodeStorage();
          res(true);
         } else {
          rej('Incorrect Code. Please try again');
         }   
       });
    });
  }

  saveCodeStorage(): void {

    let key = this.code.toString();

    if (this.platform.is('cordova')) {
      this.storage.set('code', key);
    } else {
      localStorage.setItem('code', key);
    }
  }

  loadCodeStorage(): Promise<any> {
    return new Promise ((res, rej) => {
      if (this.platform.is('cordova')) {
        this.storage.get('code').then(val => {
          if (val) {
            this.code = Number(val);
            res(true);
          } else {
            rej('No Data to Load from Storage');
          }  
        })
      } else {
          if (localStorage.getItem('code')) {
            this.code = Number(localStorage.getItem('code'));
            res(true);
          } else {
            rej('No Data to Load from Storage');
          }  
      }
    });
  }

  removeData(): void {
    this.code = null;

    if (this.platform.is('cordova')) {
      this.storage.remove('code');
    } else {
      localStorage.removeItem('code');
    }

    try {
      if (this.document) {
        this.document.unsubscribe();
      }
    } catch (err) {
      console.log(err);
    }
    
  }

}
