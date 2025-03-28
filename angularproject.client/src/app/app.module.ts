import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './mona/feedback/feedback.component';
import { UsersComponent } from './mona/users/users.component';
import { VouchersComponent } from './mona/vouchers/vouchers.component';

import { DashboardComponent } from './mona/dashboard/dashboard.component';
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';
import { SidebarComponent } from './mona/sidebar/sidebar.component';
import { DashboardcontentComponent } from './mona/dashboardcontent/dashboardcontent.component';
import { ShowallproductsComponent } from './Toqa/showallproducts/showallproducts.component';
import { OrdersComponent } from './Toqa/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    UsersComponent,
    VouchersComponent,
    DashboardComponent,
   
    AddCategoryComponent,
    ShowAllCategoryComponent,
    EditCategoryComponent,
    AddProductComponent,
    SidebarComponent,
    DashboardcontentComponent,
    ShowallproductsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
