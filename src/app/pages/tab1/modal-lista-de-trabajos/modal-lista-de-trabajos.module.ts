import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalListaDeTrabajosPageRoutingModule } from './modal-lista-de-trabajos-routing.module';

import { ModalListaDeTrabajosPage } from './modal-lista-de-trabajos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalListaDeTrabajosPageRoutingModule
  ],
  declarations: [ModalListaDeTrabajosPage]
})
export class ModalListaDeTrabajosPageModule {}
