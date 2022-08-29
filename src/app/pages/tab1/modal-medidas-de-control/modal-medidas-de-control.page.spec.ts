import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMedidasDeControlPage } from './modal-medidas-de-control.page';

describe('ModalMedidasDeControlPage', () => {
  let component: ModalMedidasDeControlPage;
  let fixture: ComponentFixture<ModalMedidasDeControlPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMedidasDeControlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMedidasDeControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
