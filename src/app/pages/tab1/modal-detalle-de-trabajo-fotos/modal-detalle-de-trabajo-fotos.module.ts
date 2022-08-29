import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoFotosPageRoutingModule } from './modal-detalle-de-trabajo-fotos-routing.module';

import { ModalDetalleDeTrabajoFotosPage } from './modal-detalle-de-trabajo-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetalleDeTrabajoFotosPageRoutingModule
  ],
  declarations: [ModalDetalleDeTrabajoFotosPage]
})
export class ModalDetalleDeTrabajoFotosPageModule {}
