import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../service/cartservice.service';
import { OrderService } from '../service/order.service';
import { VoucherService } from '../service/voucher.service';

interface CartProduct {
  productId: string;
  quantity: number;
  message: string;
  name?: string;
  price?: number;
  img?: string;
}

interface Cart {
  userId: number;
  products: CartProduct[];
  cartId: string;
}

interface Voucher {
  userId: number;
  Name: string;
  Discount: number;
  Userid: string[];
  id: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  userId: number = 0;
  cart!: Cart;
  totalPrice: number = 0;
  location: string = '';
  phoneNumber: string = '';
  recipientName: string = '';  // ✅ إضافة اسم المستلم هنا
  paymentMethod: string = 'Orange Money';
  isLoading: boolean = true;
  vouchers: Voucher[] = [];
  selectedVoucherId: string = '';
  discountedPrice: number = 0;

  constructor(
    private cartService: CartserviceService,
    private orderService: OrderService,
    private voucherService: VoucherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserIdFromLoggedApi();
  }
  getUserIdFromLoggedApi(): void {
    this.cartService.checkLoggedStatus().subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0 && response[0].userId) {
          this.userId = Number(response[0].userId);  // استخراج الـ userId من داخل المصفوفة
          console.log('✅ User ID Retrieved from Logged API (Array):', this.userId);
        }
        else {
          console.error('❌ Failed to retrieve user ID from logged API. Response:', response);
        }
        if (this.userId) {
          this.loadCart();
          this.loadUserVouchers();
        }
      },
      (error) => console.error('❌ Error fetching user ID from logged API:', error)
    );
  }

  loadCart(): void {
    this.cartService.getCartByUserId(this.userId).subscribe(
      (cartData: Cart[]) => {
        if (cartData.length > 0) {
          this.cart = cartData[0];
          this.calculateTotalPrice();
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to load cart:', error);
        this.isLoading = false;
      }
    );
  }

  loadUserVouchers(): void {
    this.voucherService.getVouchersByUserId(this.userId.toString()).subscribe(
      (vouchers: Voucher[]) => this.vouchers = vouchers,
      (error) => console.error('Failed to load user vouchers:', error)
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    if (this.cart && this.cart.products) {
      this.cart.products.forEach(product => {
        if (product.price && product.quantity) {
          this.totalPrice += product.price * product.quantity;
        }
      });
      this.discountedPrice = this.totalPrice;
    }
  }

  applyVoucher(): void {
    const selectedVoucher = this.vouchers.find(voucher => voucher.id === this.selectedVoucherId);
    if (selectedVoucher) {
      const discount = selectedVoucher.Discount;
      this.discountedPrice = this.totalPrice - (this.totalPrice * (discount / 100));
    } else {
      this.discountedPrice = this.totalPrice;
    }
  }

  completeOrder(): void {
    if (!this.location || !this.phoneNumber || !this.recipientName) {
      alert('Please fill in all the required fields: Location, Phone Number, and Recipient Name.');
      return;
    }

    const orderData = {
      userId: this.userId,
      products: this.cart.products,
      location: this.location,
      phoneNumber: this.phoneNumber,
      recipientName: this.recipientName,
      paymentMethod: this.paymentMethod,
      date: new Date().toISOString(),
      totalPrice: this.discountedPrice
    };

    this.orderService.getUserOrders(this.userId.toString()).subscribe(
      (response) => {
        if (response && response.orderData) {
          response.orderData.push(orderData);
          this.orderService.addOrder(this.userId.toString(), response.orderData).subscribe(
            () => {
              console.log('Order added successfully!');
              alert('Order placed successfully!');
              this.removeUsedVoucher();
              this.clearCart();
            },
            (error) => console.error('Failed to update order:', error)
          );
        }
      },
      (error) => {
        if (error.status === 404) {
          this.orderService.createUserOrder(this.userId.toString(), [orderData]).subscribe(
            () => {
              console.log('New order created successfully!');
              alert('Order placed successfully!');
              this.removeUsedVoucher();
              this.clearCart();
            },
            (error) => console.error('Failed to create order:', error)
          );
        } else {
          console.error('Failed to retrieve user orders:', error);
        }
      }
    );
  }

  clearCart(): void {
    if (!this.cart || !this.cart.cartId) return;

    this.cartService.clearCart(this.cart.cartId).subscribe(
      () => {
        console.log('Cart cleared successfully!');
        this.cart.products = [];
        this.totalPrice = 0;
        this.discountedPrice = 0;
      },
      (error) => console.error('Failed to clear cart:', error)
    );
  }

  removeUsedVoucher(): void {
    if (this.selectedVoucherId) {
      this.voucherService.deleteVoucher(this.selectedVoucherId, this.userId.toString()).subscribe(
        () => {
          console.log('Voucher deleted successfully');
          this.loadCart();
          this.router.navigate(['/history']);
        },
        (error) => console.error('Failed to delete voucher:', error)
      );
    }
  }
}
