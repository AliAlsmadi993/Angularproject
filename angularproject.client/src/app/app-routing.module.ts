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
import { DashboardcontentComponent } from './mona/dashboardcontent/dashboardcontent.component';
import { ShowallproductsComponent } from './Toqa/showallproducts/showallproducts.component';
import { OrdersComponent } from './Toqa/orders/orders.component';

const routes: Routes = [


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


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
