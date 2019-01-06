import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Pages
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { HowItWorksPageModule } from '../pages/how-it-works/how-it-works.module';

// Providers
import { UserProvider } from '../providers/user/user';
import { LocationProvider } from '../providers/location/location';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../config/config.firebase';

// Storage
import { IonicStorageModule } from '@ionic/storage';

// Location
import { Geolocation } from '@ionic-native/geolocation';

// Background Location
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HomePageModule,
    LoginPageModule,
    HowItWorksPageModule,
    AngularFireModule.initializeApp(environment.firebase, 'TaxiTracker'), 
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LocationProvider,
    BackgroundGeolocation,
    Geolocation
  ]
})
export class AppModule {}
