
import { Component } from '@angular/core';
import { SaService } from '../sa.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  stuff: any[] = [];
  userId: string | null = null;

  constructor(private _h: SaService) { }

  ngOnInit() {
    this.getUserIdFromLoggedApi();
  }

  getUserIdFromLoggedApi() {
    this._h.checkLoggedStatus().subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0 && response[0].userId) {
          this.userId = response[0].userId.toString();  // ✅ جلب الـ userId من الـ API
          console.log('✅ User ID Retrieved from Logged API:', this.userId);
          this.showhistory();  // استدعاء الدالة بعد الحصول على الـ userId
        } else {
          console.error('❌ Failed to retrieve user ID from Logged API. Response:', response);
        }
      },
      (error) => console.error('❌ Error fetching user ID from Logged API:', error)
    );
  }

  showhistory() {
    if (this.userId) {
      this._h.gethistory(this.userId).subscribe(
        (data) => {
          this.stuff = data.orderData;  // ✅ احفظ الـ orderData مباشرة من الـ API
          console.log('✅ History data loaded successfully:', this.stuff);
        },
        (error) => console.error('❌ Failed to fetch order history:', error)
      );
    } else {
      console.error('❌ No valid user ID found.');
    }
  }
}
