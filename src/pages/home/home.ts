import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { config } from '../../config/config.background';

import { BackgroundGeolocation,  
         BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lng: number;
  name: string;
  ready = false;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private _user: UserProvider,
              private _geo: LocationProvider,
              public platform: Platform,
              private backgroundGeolocation: BackgroundGeolocation) {
      _geo.initTaxiDocument();          
      _geo.initGeoLocation();
  }

  ionViewDidEnter(): void {
    this.getCoords();
    this.initBackGroundLocation();
  }

  getCoords(): void {
    this._geo.taxi.valueChanges()
     .subscribe(res => {

       try {
          this.lat = res.lat;
          this.lng = res.lng;
          this.name = res.name;
          this.ready = true;
       } catch (err) {
        console.log('Error getting location', err); 
        this.navCtrl.setRoot(LoginPage);
       }
      
     });
  }

  initBackGroundLocation(): void {
      if (this.platform.is('cordova')) {
        this.backgroundGeolocation.configure(config)
          .subscribe((location: BackgroundGeolocationResponse) => {
              this._geo.taxi.update({
                  lat: location.latitude,
                  lng: location.longitude
              }).then(() => {
                if (this.platform.is('ios')) {
                  this.backgroundGeolocation.finish(); // FOR IOS ONLY
                }
              }).catch((error) => {
                console.log(JSON.stringify(error));
              });
      }, (error) => {
        console.log('Error updating location on Background', error);
      });
      setTimeout(() => {
        this.backgroundGeolocation.start();
      }, 500);
    }
  }

  exit(): void {
    this._user.removeData();
    this._geo.stopGeoLocation();
    this.navCtrl.setRoot(LoginPage);
    this.backgroundGeolocation.stop();
  }

  showConfirm(): void {
    this.alertCtrl.create({
      title: 'Exit?',
      message: 'Geolocation will end, are You sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.exit();
          }
        }
      ]
    }).present();
  }

}
