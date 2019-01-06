import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { HowItWorksPage } from '../how-it-works/how-it-works';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private _user: UserProvider) {
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.lockSlides(true);
  }

  presentPrompt(): void {

    this.alertCtrl.create({
      title: 'Log In',
      inputs: [
        {
          name: 'code',
          placeholder: 'Taxi Code',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log in',
          handler: data => {
            this.verifyCode(data.code);
          }
        }
      ]
    }).present();

  }

  verifyCode(code: number): void {

    let loader = this.loadingCtrl.create({
      content: 'Verifying...'
    });

    loader.present();

    this._user.verifyUser(code)
     .then(()=> {
       loader.dismiss();
       this.lockSlides(false);
       this.slides.slideNext();
       this.lockSlides(true);
     })
     .catch(err => {
       loader.dismiss();
       this.alertCtrl.create({
         title: 'Error',
         subTitle: err,
         buttons: ['Accept']
       }).present();
     });

  }

  lockSlides(lock: boolean): void {
    this.slides.lockSwipes(lock);
    this.slides.freeMode = !lock;
  }

  login(): void {
    this.navCtrl.setRoot(HomePage);
  }

  howWorks(): void {
    this.navCtrl.push(HowItWorksPage);
  }

}
