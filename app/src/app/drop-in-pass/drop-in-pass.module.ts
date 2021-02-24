import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DropInPassPage } from './drop-in-pass.page';

import { DropInPassRoutingModule } from './drop-in-pass-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropInPassRoutingModule
  ],
  declarations: [DropInPassPage]
})
export class DropInPassModule {}
