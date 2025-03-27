import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './mona/users/users.component';
import { VouchersComponent } from './mona/vouchers/vouchers.component';
import { FeedbackComponent } from './mona/feedback/feedback.component';
import { DashboardComponent } from './mona/dashboard/dashboard.component';
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';

const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "vouchers", component: VouchersComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "dashboard", component: DashboardComponent },
    { path: "", component: ShowAllCategoryComponent },
  { path: "AddCategory", component: AddCategoryComponent },
  { path: "AllCategories", component: ShowAllCategoryComponent },
  { path: "EditCategory/:id", component: EditCategoryComponent },
  { path: "AddProduct", component: AddProductComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
