import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoPage } from './account-info.page';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule {}
