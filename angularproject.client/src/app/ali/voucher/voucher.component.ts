import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('wheelContainer') wheelContainer!: ElementRef;

  vouchers: Voucher[] = [
    { Discount: 10, Userid: [] },
    { Discount: 20, Userid: [] },
    { Discount: 30, Userid: [] },
    { Discount: 40, Userid: [] },
    { Discount: 50, Userid: [] },
    { Discount: 60, Userid: [] },
    { Discount: 70, Userid: [] },
    { Discount: 80, Userid: [] },
    { Discount: 90, Userid: [] },
    { Discount: 100, Userid: [] }
  ];

  selectedVoucher!: Voucher;
  currentRotation = 0;
  isSpinning = false;
  userId: string;
  sliceAngle: number;
  showResult = false;

  constructor(private voucherService: VoucherService) {
    this.sliceAngle = 360 / this.vouchers.length;
    this.userId = sessionStorage.getItem('userId') || '73';
  }

  ngOnInit(): void {
    console.log('VoucherComponent has been initialized');
  }

  spinWheel(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;
    const randomDegree = Math.floor(Math.random() * 360) + 5 * 360;
    this.currentRotation += randomDegree;
    const wheelElement = this.wheelContainer.nativeElement;

    wheelElement.style.transition = 'transform 5s ease-out';
    wheelElement.style.transform = `rotate(${this.currentRotation}deg)`;

    wheelElement.addEventListener('transitionend', () => {
      this.isSpinning = false;
      this.determineVoucher();
    }, { once: true });
  }

  private determineVoucher(): void {
    const normalizedRotation = (this.currentRotation % 360 + 360) % 360;
    const selectedIndex = Math.floor(normalizedRotation / this.sliceAngle);
    this.selectedVoucher = this.vouchers[selectedIndex];
    this.showResult = true;

    this.saveVoucherToUser(this.selectedVoucher);
  }

  private saveVoucherToUser(voucher: Voucher): void {
    if (!voucher.Userid.includes(this.userId)) {  // إذا كان المستخدم لم يحصل على الفويتشر من قبل
      voucher.Userid.push(this.userId);

      console.log('🚀 Preparing to send voucher data to API:', voucher);

      if (voucher.id) {  // إذا كان موجودًا، نقوم بالتحديث (PUT)
        this.voucherService.updateVoucher(voucher.id, voucher, this.userId).subscribe({
          next: (response) => console.log('✅ Voucher updated successfully:', response),
          error: (err) => console.error('❌ Error updating voucher on API:', err)
        });
      } else {  // إذا لم يكن موجودًا، نقوم بإنشائه (POST)
        this.voucherService.createVoucher(voucher).subscribe({
          next: (response) => {
            console.log('✅ Voucher created successfully:', response);
            voucher.id = response.id;  // تحديث الـ ID بعد إنشائه
          },
          error: (err) => console.error('❌ Error creating voucher on API:', err)
        });
      }
    } else {
      console.log('🔒 User already owns this voucher. No update required.');
    }
  }

  closeResultPopup(): void {
    this.showResult = false;
  }

  getSliceColor(index: number): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FF8F33', '#33FFD1', '#FF3333', '#8D33FF', '#33FFF6', '#F3FF33'];
    return colors[index % colors.length];
  }
}
