import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../service/cartservice.service';
import { ActivatedRoute, Router } from '@angular/router';

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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userId: number = 0;
  cart!: Cart;
  totalPrice: number = 0;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    this.cartService.checkLoggedStatus().subscribe(
      (response) => {
        console.log('🔍 Response from Logged API:', response);  // لمراقبة ما يتم جلبه من Logged API

        if (response && response.length > 0 && response[0].userId) {
          this.userId = Number(response[0].userId);
          console.log('✅ User ID Retrieved from Logged API:', this.userId);
          this.isLoggedIn = true;
          this.loadCart();
        } else {
          console.log('🚫 No User ID Found. Loading Guest Cart...');
          this.loadGuestCart();
        }
      },
      (error) => {
        console.error('❌ Failed to check user status:', error);
        this.loadGuestCart();
      }
    );
  }

  loadCart(): void {
    this.cartService.getCartByUserId(this.userId).subscribe(
      (cartData: Cart[]) => {
        if (cartData.length > 0) {
          this.cart = cartData[0];
          console.log('✅ User Cart Loaded:', this.cart);
          this.calculateTotalPrice();
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Failed to load user cart:', error);
        this.isLoading = false;
      }
    );
  }

  loadGuestCart(): void {
    this.cartService.getGuestCart().subscribe(
      (cartData: Cart[]) => {
        if (cartData.length > 0) {
          this.cart = cartData[0];
          console.log('✅ Guest Cart Loaded:', this.cart);
          this.calculateTotalPrice();
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Failed to load guest cart:', error);
        this.isLoading = false;
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.cart.products.forEach(product => {
      if (product.price && product.quantity) {
        this.totalPrice += product.price * product.quantity;
      }
    });
  }

  increaseQuantity(product: CartProduct): void {
    product.quantity++;
    this.calculateTotalPrice();
  }

  decreaseQuantity(product: CartProduct): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.calculateTotalPrice();
    }
  }

  removeProduct(productId: string): void {
    const updatedProducts = this.cart.products.filter(p => p.productId !== productId);

    this.cartService.deleteProductFromCart(this.cart.cartId, updatedProducts).subscribe(
      (response) => {
        console.log('✅ Product removed successfully from API!', response);
        this.cart.products = updatedProducts;
        this.calculateTotalPrice();
      },
      (error) => console.error('❌ Failed to remove product from API:', error)
    );
  }

  saveCart(): void {
    this.cartService.updateCart(this.cart.cartId, this.cart.products).subscribe(
      (response) => console.log('✅ Cart saved successfully!', response),
      (error) => console.error('❌ Failed to save cart:', error)
    );
  }

  checkout(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/checkout'], {
        state: {
          cart: this.cart,
          totalPrice: this.totalPrice
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
