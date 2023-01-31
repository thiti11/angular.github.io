import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEquComponent } from './order-equ.component';

describe('OrderEquComponent', () => {
  let component: OrderEquComponent;
  let fixture: ComponentFixture<OrderEquComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderEquComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEquComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
