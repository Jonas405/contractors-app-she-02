import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPermisoDeTrabajoPageRoutingModule } from './modal-permiso-de-trabajo-routing.module';

import { ModalPermisoDeTrabajoPage } from './modal-permiso-de-trabajo.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    SignaturePadModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ModalPermisoDeTrabajoPageRoutingModule
  ],
  declarations: [ModalPermisoDeTrabajoPage]
})
export class ModalPermisoDeTrabajoPageModule {}
