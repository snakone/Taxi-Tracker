import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProvider } from '../user/user';
import { Subscription } from 'rxjs';

@Injectable()
export class LocationProvider {

  taxi: AngularFirestoreDocument <any>;
  private watch: Subscription;

  constructor(private geolocation: Geolocation,
              public _user: UserProvider,
              private db: AngularFirestore) {   
  }

  initTaxiDocument(): void {
    this.taxi = this.db.doc(`users/${this._user.code}`);
  }

  initGeoLocation(): void {
    this.geolocation.getCurrentPosition().then((res) => {
      this.taxi.update({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
        code: this._user.code
      }).catch(() => {
        console.log('Bad guy! You removed an User before Exit!');
        this._user.removeData();
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

      this.watch = this.geolocation.watchPosition()
       .subscribe((data) => {
        this.taxi.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude
        }).catch(() => {
          console.log('Bad guy! You removed an User before Exit!');
          this._user.removeData();
        });
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  stopGeoLocation(): void {
    try {
      this.watch.unsubscribe();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

}
