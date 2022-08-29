import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMedidasDeControlPageRoutingModule } from './modal-medidas-de-control-routing.module';

import { ModalMedidasDeControlPage } from './modal-medidas-de-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMedidasDeControlPageRoutingModule
  ],
  declarations: [ModalMedidasDeControlPage]
})
export class ModalMedidasDeControlPageModule {}
