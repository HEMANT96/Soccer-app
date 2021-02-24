import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListStudioPage } from './list-studio.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ListStudioRoutingModule } from './list-studio-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListStudioRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListStudioPage]
})
export class ListStudioModule {}
