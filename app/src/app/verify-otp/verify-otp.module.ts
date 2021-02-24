import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VerifyOtpPage } from './verify-otp.page';

import { VerifyOtpRoutingModule } from './verify-otp-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyOtpRoutingModule
  ],
  declarations: [VerifyOtpPage]
})
export class VerifyOtpModule {}
