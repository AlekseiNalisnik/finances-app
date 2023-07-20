import { NgFor } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletDataService } from 'src/app/services/wallet-data.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  imports: [CommonModule, CdkDropList, NgFor, CdkDrag],
})
export class WalletComponent implements OnInit {
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  constructor(public readonly walletDataService: WalletDataService) {}

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  public ngOnInit(): void {
    this.walletDataService.getWallets();
  }

}
