import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { timer } from 'rxjs';
import { LoginPage } from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              _user: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      _user.loadCodeStorage()
       .then(() => {
         this.rootPage = HomePage;
       })
       .catch(() => {
         this.rootPage = LoginPage;
       })

      statusBar.styleLightContent();
      splashScreen.hide();

      timer(2000).subscribe(() => {
        this.showSplash = false;
      })
    });
  }
}

