import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCapacitacionesPage } from './modal-capacitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCapacitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCapacitacionesPageRoutingModule {}
