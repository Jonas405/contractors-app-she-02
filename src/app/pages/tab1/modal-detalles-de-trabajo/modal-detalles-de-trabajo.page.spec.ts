import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetallesDeTrabajoPage } from './modal-detalles-de-trabajo.page';

describe('ModalDetallesDeTrabajoPage', () => {
  let component: ModalDetallesDeTrabajoPage;
  let fixture: ComponentFixture<ModalDetallesDeTrabajoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesDeTrabajoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetallesDeTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
