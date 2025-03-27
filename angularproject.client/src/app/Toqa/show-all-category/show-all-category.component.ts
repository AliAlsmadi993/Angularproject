import { Component } from '@angular/core';
import { AdminService } from '../../Admin Services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-show-all-category',
  templateUrl: './show-all-category.component.html',
  styleUrl: './show-all-category.component.css'
})
export class ShowAllCategoryComponent {

  constructor(private _admin: AdminService) { }

  ngOnInit() {
    this.ShowAllCategories()
  }

  CategoryContainer: any;
  ShowAllCategories() {
    this._admin.ShowAllCategory().subscribe((data) => {
      this.CategoryContainer = data;


    });
  }


DeleteCategory(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the category.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this._admin.DeleteCategory(id).subscribe({
        next: () => {
          this.ShowAllCategories();
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The category has been deleted.',
            timer: 1500,
            showConfirmButton: false
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while deleting!'
          });
        }
      });
    }
  });
}

}
