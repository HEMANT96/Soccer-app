import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OnBoardingPage } from './on-boarding.page';

import { OnBoardingRoutingModule } from './on-boarding-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingRoutingModule
  ],
  declarations: [OnBoardingPage]
})
export class OnBoardingModule {}
