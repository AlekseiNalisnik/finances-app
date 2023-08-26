import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TransactionDialogData, TransactionDialogRefData } from 'src/app/interfaces/dialog-interface';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  public form!: FormGroup;

  constructor(
    public readonly dialogRef: DialogRef<TransactionDialogRefData>,
    @Inject(DIALOG_DATA) public readonly data: TransactionDialogData,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    this.dialogRef.close({
      ...this.data?.data,
      ...this.form.value,
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      paymentType: new FormControl(this.data?.data?.data?.paymentType || null, Validators.required),
      purchasePlace: new FormControl(this.data?.data?.data?.purchasePlace || null, Validators.required),
      purpose: new FormControl(this.data?.data?.data?.purpose || '', Validators.required),
      dateCreated: new FormControl(this.data?.data?.data?.dateCreated || null, Validators.required),
      price: new FormControl(this.data?.data?.data?.price || 0, Validators.required),
      description: new FormControl(this.data?.data?.data?.description || ''),
    });
  }
}
