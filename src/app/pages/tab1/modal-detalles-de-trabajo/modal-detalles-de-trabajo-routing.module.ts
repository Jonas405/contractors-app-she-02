import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetallesDeTrabajoPage } from './modal-detalles-de-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetallesDeTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetallesDeTrabajoPageRoutingModule {}
