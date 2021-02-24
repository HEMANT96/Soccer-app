import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudioPage } from './list-studio.page';

const routes: Routes = [
  {
    path: '',
    component: ListStudioPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListStudioRoutingModule {}
