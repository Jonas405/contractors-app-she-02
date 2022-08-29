import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetallesDeTrabajoPageRoutingModule } from './modal-detalles-de-trabajo-routing.module';

import { ModalDetallesDeTrabajoPage } from './modal-detalles-de-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetallesDeTrabajoPageRoutingModule
  ],
  declarations: [ModalDetallesDeTrabajoPage]
})
export class ModalDetallesDeTrabajoPageModule {}
