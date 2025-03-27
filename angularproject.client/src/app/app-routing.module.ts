import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './Toqa/add-category/add-category.component';
import { ShowAllCategoryComponent } from './Toqa/show-all-category/show-all-category.component';
import { EditCategoryComponent } from './Toqa/edit-category/edit-category.component';
import { AddProductComponent } from './Toqa/add-product/add-product.component';

const routes: Routes = [
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
