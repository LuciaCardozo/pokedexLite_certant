import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConBotonComponent } from './input-con-boton.component';

describe('InputConBotonComponent', () => {
  let component: InputConBotonComponent;
  let fixture: ComponentFixture<InputConBotonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputConBotonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputConBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
