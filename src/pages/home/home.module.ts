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
      apiKey: 'AIzaSyCN1vq4PuxSrZhsSn6U_L0OFdYaE0UPQKk'
    })
  ],
})
export class HomePageModule {}
