import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCapacitacionesPageRoutingModule } from './modal-capacitaciones-routing.module';

import { ModalCapacitacionesPage } from './modal-capacitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCapacitacionesPageRoutingModule
  ],
  declarations: [ModalCapacitacionesPage]
})
export class ModalCapacitacionesPageModule {}
