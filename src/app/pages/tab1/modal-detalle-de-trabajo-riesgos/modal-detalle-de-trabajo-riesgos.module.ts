import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoRiesgosPageRoutingModule } from './modal-detalle-de-trabajo-riesgos-routing.module';

import { ModalDetalleDeTrabajoRiesgosPage } from './modal-detalle-de-trabajo-riesgos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetalleDeTrabajoRiesgosPageRoutingModule
  ],
  declarations: [ModalDetalleDeTrabajoRiesgosPage]
})
export class ModalDetalleDeTrabajoRiesgosPageModule {}
