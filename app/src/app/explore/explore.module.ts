import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExplorePage } from './explore.page';

import { ExploreRoutingModule } from './explore-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreRoutingModule
  ],
  declarations: [ExplorePage]
})
export class ExploreModule {}
