import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMedidasDeControlPage } from './modal-medidas-de-control.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMedidasDeControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMedidasDeControlPageRoutingModule {}
