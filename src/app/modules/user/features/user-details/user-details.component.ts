import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { UserState } from '../../../../store/user.reducer';
import { addUser, updateUser } from '../../../../store/user.actions';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() data!: { id: number; name: string; job: string };

  form: FormGroup;
  formSubmitted = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store<{ users: UserState }>);
  private readonly activeModal = inject(NgbActiveModal);

  constructor() {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  get showNameError(): boolean {
    const { name } = this.form.controls;
    return this.formSubmitted && name.invalid;
  }

  get showJobError(): boolean {
    const { job } = this.form.controls;
    return this.formSubmitted && job.invalid;
  }

  get submitButtonText(): string {
    return this.data ? 'Update' : 'Add';
  }

  closeDialog(): void {
    this.activeModal.close();
  }

  handleSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.data ? this.handleUpdateUser() : this.handleCreateUser();
    }
  }

  private handleCreateUser(): void {
    const { name, job } = this.form.value;
    this.store.dispatch(addUser({ user: { name, job } }));
    this.closeDialog();
  }

  private handleUpdateUser(): void {
    const { id, name, job } = this.form.value;
    this.store.dispatch(updateUser({ user: { id, name, job } }));
    this.closeDialog();
  }
}
