import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BookGamePage } from './book-game.page';

import { BookGameRoutingModule } from './book-game-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookGameRoutingModule
  ],
  declarations: [BookGamePage]
})
export class BookGameModule {}
