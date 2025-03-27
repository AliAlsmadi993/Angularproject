import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './adnan/login/login.component';
import { RegisterComponent } from './adnan/register/register.component';
import { AboutComponent } from './adnan/about/about.component';
import { ContactComponent } from './adnan/contact/contact.component';
import { HomeComponent } from './adnan/home/home.component';
import { CartComponent } from './ali/cart/cart.component';
import { CheckoutComponent } from './ali/checkout/checkout.component';
import { VoucherComponent } from './ali/voucher/voucher.component';

import { UsersComponent } from './mona/users/users.component';
import { VouchersComponent } from './mona/vouchers/vouchers.component';
import { FeedbackComponent } from './mona/feedback/feedback.component';
import { DashboardComponent } from './mona/dashboard/dashboard.component';
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';
import { ProfileandeditComponent} from './Amal/profileandedit/profileandedit.component';
import { HistoryComponent } from './Amal/history/history.component';


const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "vouchers", component: VouchersComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "dashboard", component: DashboardComponent },

  { path: "AddCategory", component: AddCategoryComponent },
  { path: "AllCategories", component: ShowAllCategoryComponent },
  { path: "EditCategory/:id", component: EditCategoryComponent },
  { path: "AddProduct", component: AddProductComponent },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "profile", component: ProfileandeditComponent },
  { path: "history", component: HistoryComponent }
];


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
