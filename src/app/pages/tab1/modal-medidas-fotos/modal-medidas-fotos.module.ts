import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMedidasFotosPageRoutingModule } from './modal-medidas-fotos-routing.module';

import { ModalMedidasFotosPage } from './modal-medidas-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMedidasFotosPageRoutingModule
  ],
  declarations: [ModalMedidasFotosPage]
})
export class ModalMedidasFotosPageModule {}
