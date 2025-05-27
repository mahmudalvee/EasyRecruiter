import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVBankComponent } from './cvbank.component';

describe('CVBankComponent', () => {
  let component: CVBankComponent;
  let fixture: ComponentFixture<CVBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
