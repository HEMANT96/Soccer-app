import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VerifyPhonePage } from './verify-phone.page';

import { VerifyPhoneRoutingModule } from './verify-phone-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyPhoneRoutingModule
  ],
  declarations: [VerifyPhonePage]
})
export class VerifyPhoneModule {}
