import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoListaEmpleadosPage } from './modal-detalle-de-trabajo-lista-empleados.page';

describe('ModalDetalleDeTrabajoListaEmpleadosPage', () => {
  let component: ModalDetalleDeTrabajoListaEmpleadosPage;
  let fixture: ComponentFixture<ModalDetalleDeTrabajoListaEmpleadosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleDeTrabajoListaEmpleadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetalleDeTrabajoListaEmpleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
