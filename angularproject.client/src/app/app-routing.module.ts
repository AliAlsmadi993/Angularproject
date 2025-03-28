import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components from 'adnan'
import { LoginComponent } from './adnan/login/login.component';
import { RegisterComponent } from './adnan/register/register.component';
import { AboutComponent } from './adnan/about/about.component';
import { ContactComponent } from './adnan/contact/contact.component';
import { HomeComponent } from './adnan/home/home.component';

// Components from 'ali'
import { CartComponent } from './ali/cart/cart.component';
import { CheckoutComponent } from './ali/checkout/checkout.component';
import { VoucherComponent } from './ali/voucher/voucher.component';

// Components from 'mona'
import { UsersComponent } from './mona/users/users.component';
import { VouchersComponent } from './mona/vouchers/vouchers.component';
import { FeedbackComponent } from './mona/feedback/feedback.component';
import { DashboardComponent } from './mona/dashboard/dashboard.component';

// Components from 'amal'
import { ProfileandeditComponent } from './amal/profileandedit/profileandedit.component';
import { HistoryComponent } from './amal/history/history.component';

// Components from 'Toqa' (Ensure all paths are unified)
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { DashboardcontentComponent } from './mona/dashboardcontent/dashboardcontent.component';
import { ShowallproductsComponent } from './Toqa/showallproducts/showallproducts.component';
import { OrdersComponent } from './Toqa/orders/orders.component';

const routes: Routes = [
  // 'adnan' routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // 'ali' routes
  { path: 'carts', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'Voucher', component: VoucherComponent },

  // 'mona' routes
  { path: 'users', component: UsersComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'dashboard', component: DashboardComponent },


  { path: "", component: DashboardComponent   },
 

  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "AddCategory", component: AddCategoryComponent },
      { path: "AllCategories", component: ShowAllCategoryComponent },
      { path: "EditCategory/:id", component: EditCategoryComponent },
      { path: "AddProduct", component: AddProductComponent },
      { path: "users", component: UsersComponent },
      { path: "vouchers", component: VouchersComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "dashboardcontent", component: DashboardcontentComponent },
      { path: "allproducts", component: ShowallproductsComponent },
      { path: "Orders", component: OrdersComponent },




    ]
  }

  // 'amal' routes
  { path: 'profile', component: ProfileandeditComponent },
  { path: 'history', component: HistoryComponent },

  // 'Toqa' routes (Ensure casing consistency)
  { path: 'AllCategories', component: ShowAllCategoryComponent },
  { path: 'EditCategory/:id', component: EditCategoryComponent },
  { path: 'AddProduct', component: AddProductComponent },
  { path: 'AddCategory', component: AddCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
