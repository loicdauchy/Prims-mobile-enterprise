import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPointPage } from './add-point.page';

const routes: Routes = [
  {
    path: '',
    component: AddPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPointPageRoutingModule {}
