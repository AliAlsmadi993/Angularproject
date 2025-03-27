import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  private CategoryAPI = 'https://67d5f9cd286fdac89bc0e100.mockapi.io/Categories';
  private ProductAPI='https://67e2bc4a97fc65f535375ff8.mockapi.io/product';

    AddCategory(Category:any){
      return this._http.post(this.CategoryAPI, Category);
  }

  ShowAllCategory() {
    return this._http.get(this.CategoryAPI);
  }

  editCategory(id: any, EditedCategory: any) {
    return this._http.put(`${this.CategoryAPI}/${id}`, EditedCategory)
  }

  GetCategoryByID(id: any) {
    return this._http.get(`${this.CategoryAPI}/${id}`);
  }

  DeleteCategory(id: any) {
    return this._http.delete(`${this.CategoryAPI}/${id}`)
  }

  AddProduct(Product: any) {
    return this._http.post(this.ProductAPI, Product)
  }



}
