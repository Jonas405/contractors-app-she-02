import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'modal-permiso-de-trabajo',
    loadChildren: () => import('./modal-permiso-de-trabajo/modal-permiso-de-trabajo.module').then( m => m.ModalPermisoDeTrabajoPageModule)
  },
  {
    path: 'modal-medidas-de-control',
    loadChildren: () => import('./modal-medidas-de-control/modal-medidas-de-control.module').then( m => m.ModalMedidasDeControlPageModule)
  },
  {
    path: 'modal-lista-de-trabajos',
    loadChildren: () => import('./modal-lista-de-trabajos/modal-lista-de-trabajos.module').then( m => m.ModalListaDeTrabajosPageModule)
  },
  {
    path: 'modal-detalles-de-trabajo',
    loadChildren: () => import('./modal-detalles-de-trabajo/modal-detalles-de-trabajo.module').then( m => m.ModalDetallesDeTrabajoPageModule)
  },
  {
    path: 'modal-detalle-de-trabajo-riesgos',
    loadChildren: () => import('./modal-detalle-de-trabajo-riesgos/modal-detalle-de-trabajo-riesgos.module').then( m => m.ModalDetalleDeTrabajoRiesgosPageModule)
  },
  {
    path: 'modal-detalle-de-trabajo-lista-empleados',
    loadChildren: () => import('./modal-detalle-de-trabajo-lista-empleados/modal-detalle-de-trabajo-lista-empleados.module').then( m => m.ModalDetalleDeTrabajoListaEmpleadosPageModule)
  },
  {
    path: 'modal-detalle-de-trabajo-fotos',
    loadChildren: () => import('./modal-detalle-de-trabajo-fotos/modal-detalle-de-trabajo-fotos.module').then( m => m.ModalDetalleDeTrabajoFotosPageModule)
  },
  {
    path: 'modal-medidas-fotos',
    loadChildren: () => import('./modal-medidas-fotos/modal-medidas-fotos.module').then( m => m.ModalMedidasFotosPageModule)
  },
  {
    path: 'modal-capacitaciones',
    loadChildren: () => import('./modal-capacitaciones/modal-capacitaciones.module').then( m => m.ModalCapacitacionesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
