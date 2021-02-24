import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MyBookingPage } from './my-booking.page';

import { MyBookingRoutingModule } from './my-booking-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBookingRoutingModule
  ],
  declarations: [MyBookingPage]
})
export class MyBookingModule {}
