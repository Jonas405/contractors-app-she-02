import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetalleDeTrabajoRiesgosPage } from './modal-detalle-de-trabajo-riesgos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalleDeTrabajoRiesgosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetalleDeTrabajoRiesgosPageRoutingModule {}
