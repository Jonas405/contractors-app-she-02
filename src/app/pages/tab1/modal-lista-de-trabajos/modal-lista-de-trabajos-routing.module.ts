import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalListaDeTrabajosPage } from './modal-lista-de-trabajos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalListaDeTrabajosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalListaDeTrabajosPageRoutingModule {}
