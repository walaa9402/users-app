import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly assign input properties', () => {
    component.title = 'Confirm Delete';
    component.message = 'Are you sure you want to delete this item?';
    component.btnOkText = 'Yes';
    component.btnCancelText = 'No';
    fixture.detectChanges();

    expect(component.title).toBe('Confirm Delete');
    expect(component.message).toBe('Are you sure you want to delete this item?');
    expect(component.btnOkText).toBe('Yes');
    expect(component.btnCancelText).toBe('No');
  });

  it('should call NgbActiveModal close with true when accept is called', () => {
    spyOn(activeModal, 'close');
    component.accept();
    expect(activeModal.close).toHaveBeenCalledWith(true);
  });

  it('should call NgbActiveModal close with false when decline is called', () => {
    spyOn(activeModal, 'close');
    component.decline();
    expect(activeModal.close).toHaveBeenCalledWith(false);
  });
});
