import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AgmCoreModule.forRoot({
      apiKey: 'ANGULARMAPSAPIKEY'
    })
  ],
})
export class HomePageModule {}
