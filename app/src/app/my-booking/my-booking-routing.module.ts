import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingPage } from './my-booking.page';

const routes: Routes = [
  {
    path: '',
    component: MyBookingPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBookingRoutingModule {}
