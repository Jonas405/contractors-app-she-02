import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMedidasFotosPage } from './modal-medidas-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMedidasFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMedidasFotosPageRoutingModule {}
