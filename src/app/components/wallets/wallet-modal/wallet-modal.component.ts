import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { WalletDialogData, WalletDialogRefData } from 'src/app/interfaces/dialog-interface';

@Component({
  selector: 'app-wallet-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.scss']
})
export class WalletModalComponent implements OnInit {
  public walletModalForm!: FormGroup;

  constructor(
    public readonly dialogRef: DialogRef<WalletDialogRefData>,
    @Inject(DIALOG_DATA) public readonly data: WalletDialogData,
  ) {}

  public ngOnInit(): void {
    this.walletModalForm = new FormGroup({
      name: new FormControl(this.data?.data?.name || '', Validators.required),
      balance: new FormControl(this.data?.data?.balance || 0, Validators.required),
      description: new FormControl(this.data?.data?.description || '', Validators.required),
    });
  }

  public onSubmit(): void {
    this.dialogRef.close({
      name: this.walletModalForm.get('name')!.value,
      balance: this.walletModalForm.get('balance')!.value,
      description: this.walletModalForm.get('description')!.value,
    });
  }
}
