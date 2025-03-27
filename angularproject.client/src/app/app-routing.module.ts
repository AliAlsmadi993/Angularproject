import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './ali/cart/cart.component';
import { CheckoutComponent } from './ali/checkout/checkout.component';
import { VoucherComponent } from './ali/voucher/voucher.component';

const routes: Routes = [
  { path: "carts", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "Voucher", component:VoucherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
