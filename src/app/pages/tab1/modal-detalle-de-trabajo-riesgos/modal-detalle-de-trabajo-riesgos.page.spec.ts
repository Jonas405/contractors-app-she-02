import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetalleDeTrabajoRiesgosPage } from './modal-detalle-de-trabajo-riesgos.page';

describe('ModalDetalleDeTrabajoRiesgosPage', () => {
  let component: ModalDetalleDeTrabajoRiesgosPage;
  let fixture: ComponentFixture<ModalDetalleDeTrabajoRiesgosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleDeTrabajoRiesgosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetalleDeTrabajoRiesgosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
