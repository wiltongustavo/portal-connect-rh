import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendForm } from './email-send-form';

describe('EmailSendForm', () => {
  let component: EmailSendForm;
  let fixture: ComponentFixture<EmailSendForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSendForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSendForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
