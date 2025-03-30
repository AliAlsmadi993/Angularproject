import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../service/voucher.service';

interface Voucher {
  id?: string;
  Discount: number;
  Userid: string[];
}

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  userId: string = '';
  boxOpened: boolean = false;
  isOpening: boolean = false;
  showResult: boolean = false;
  selectedDiscount: string = '';

  vouchers: Voucher[] = [
    { Discount: 5, Userid: [] },
    { Discount: 10, Userid: [] },
    { Discount: 15, Userid: [] },
    { Discount: 20, Userid: [] },
    { Discount: 25, Userid: [] },
    { Discount: 30, Userid: [] },
    { Discount: 35, Userid: [] },
    { Discount: 40, Userid: [] }
  ];

  constructor(private voucherService: VoucherService) { }

  ngOnInit(): void {
    this.voucherService.checkLoggedStatus().subscribe((res: any) => {
      if (res?.[0]?.userId) this.userId = res[0].userId.toString();
    });
  }

  openBox(): void {
    if (this.isOpening || this.boxOpened) return;

    this.isOpening = true;
    this.boxOpened = true;

    const randomIndex = Math.floor(Math.random() * this.vouchers.length);
    const selectedVoucher = this.vouchers[randomIndex];

    this.selectedDiscount = selectedVoucher.Discount + '%';
    this.showResult = true;

    // ⏱️ تأخير وهمي لمتعة الفتح
    setTimeout(() => {
      this.isOpening = false;
      this.saveVoucherToUser(selectedVoucher);
    }, 1000);
  }

  closePopup(): void {
    this.showResult = false;
  }

  private saveVoucherToUser(voucher: Voucher): void {
    if (!voucher.Userid.includes(this.userId)) {
      voucher.Userid.push(this.userId);

      if (voucher.id) {
        this.voucherService.updateVoucher(voucher.id, voucher, this.userId).subscribe({
          next: (res) => console.log('✅ Voucher updated', res),
          error: (err) => console.error('❌ Update error', err)
        });
      } else {
        this.voucherService.createVoucher(voucher).subscribe({
          next: (res) => voucher.id = res.id,
          error: (err) => console.error('❌ Create error', err)
        });
      }
    }
  }
}
