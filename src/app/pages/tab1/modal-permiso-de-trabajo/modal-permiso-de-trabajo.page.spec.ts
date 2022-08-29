import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPermisoDeTrabajoPage } from './modal-permiso-de-trabajo.page';

describe('ModalPermisoDeTrabajoPage', () => {
  let component: ModalPermisoDeTrabajoPage;
  let fixture: ComponentFixture<ModalPermisoDeTrabajoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPermisoDeTrabajoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPermisoDeTrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
