import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAndTextComponent } from './label-and-text.component';

describe('LabelAndTextComponent', () => {
  let component: LabelAndTextComponent;
  let fixture: ComponentFixture<LabelAndTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelAndTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
