import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoListaEmpleadosPageRoutingModule } from './modal-detalle-de-trabajo-lista-empleados-routing.module';

import { ModalDetalleDeTrabajoListaEmpleadosPage } from './modal-detalle-de-trabajo-lista-empleados.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetalleDeTrabajoListaEmpleadosPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ModalDetalleDeTrabajoListaEmpleadosPage]
})
export class ModalDetalleDeTrabajoListaEmpleadosPageModule {}
