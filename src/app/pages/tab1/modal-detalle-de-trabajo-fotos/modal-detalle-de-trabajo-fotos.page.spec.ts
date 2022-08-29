import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoFotosPage } from './modal-detalle-de-trabajo-fotos.page';

describe('ModalDetalleDeTrabajoFotosPage', () => {
  let component: ModalDetalleDeTrabajoFotosPage;
  let fixture: ComponentFixture<ModalDetalleDeTrabajoFotosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleDeTrabajoFotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetalleDeTrabajoFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
