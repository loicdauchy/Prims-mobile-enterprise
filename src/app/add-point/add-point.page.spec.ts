import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPointPage } from './add-point.page';

describe('AddPointPage', () => {
  let component: AddPointPage;
  let fixture: ComponentFixture<AddPointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
