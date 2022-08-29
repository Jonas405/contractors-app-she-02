import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetalleDeTrabajoFotosPage } from './modal-detalle-de-trabajo-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalleDeTrabajoFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetalleDeTrabajoFotosPageRoutingModule {}
