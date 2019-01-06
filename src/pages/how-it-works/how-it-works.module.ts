import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowItWorksPage } from './how-it-works';

@NgModule({
  declarations: [
    HowItWorksPage,
  ],
  imports: [
    IonicPageModule.forChild(HowItWorksPage),
  ],
  entryComponents: [
    HowItWorksPage
  ]
})
export class HowItWorksPageModule {}
