import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AccountInfoPage } from './account-info.page';

import { AccountInfoRoutingModule } from './account-info-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountInfoRoutingModule
  ],
  declarations: [AccountInfoPage]
})
export class AccountInfoModule {}
