import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPermisoDeTrabajoPage } from './modal-permiso-de-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPermisoDeTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPermisoDeTrabajoPageRoutingModule {}
