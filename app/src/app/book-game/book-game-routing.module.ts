import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookGamePage } from './book-game.page';

const routes: Routes = [
  {
    path: '',
    component: BookGamePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookGameRoutingModule {}
