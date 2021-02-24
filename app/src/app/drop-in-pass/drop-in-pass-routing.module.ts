import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropInPassPage } from './drop-in-pass.page';

const routes: Routes = [
  {
    path: '',
    component: DropInPassPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropInPassRoutingModule {}
