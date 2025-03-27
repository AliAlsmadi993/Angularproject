import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './adnan/nav/nav.component';
import { FooterComponent } from './adnan/footer/footer.component';
import { LoginComponent } from './adnan/login/login.component';
import { RegisterComponent } from './adnan/register/register.component';
import { ContactComponent } from './adnan/contact/contact.component';
import { HomeComponent } from './adnan/home/home.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './adnan/about/about.component';
import { DashboardComponent } from './adnan/dashboard/dashboard.component';
import { FeedbackComponent } from './mona/feedback/feedback.component';
import { UsersComponent } from './mona/users/users.component';
import { VouchersComponent } from './mona/vouchers/vouchers.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './mona/dashboard/dashboard.component';
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';
import { ProfileandeditComponent } from './Amal/profileandedit/profileandedit.component';
import { HistoryComponent } from './Amal/history/history.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    AppComponent,
    FeedbackComponent,
    UsersComponent,
    VouchersComponent,
    DashboardComponent
    AppComponent,
    AddCategoryComponent,
    ShowAllCategoryComponent,
    EditCategoryComponent,
    AddProductComponent
    AppComponent,
    ProfileandeditComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
    AppRoutingModule, FormsModule
    AppRoutingModule,FormsModule
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
