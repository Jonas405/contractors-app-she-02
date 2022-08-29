import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalListaDeTrabajosPage } from './modal-lista-de-trabajos.page';

describe('ModalListaDeTrabajosPage', () => {
  let component: ModalListaDeTrabajosPage;
  let fixture: ComponentFixture<ModalListaDeTrabajosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListaDeTrabajosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalListaDeTrabajosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
