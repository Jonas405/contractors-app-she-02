import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetalleDeTrabajoListaEmpleadosPage } from './modal-detalle-de-trabajo-lista-empleados.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalleDeTrabajoListaEmpleadosPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    Ng2SearchPipeModule
  ],
  exports: [RouterModule],
})
export class ModalDetalleDeTrabajoListaEmpleadosPageRoutingModule {}
