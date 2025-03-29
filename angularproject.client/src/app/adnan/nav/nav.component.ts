import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdnanService } from '../service/adnan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  container: any;

  constructor(private _url: AdnanService, private router: Router) { }

  ngOnInit() {
    this._url.userObservable.subscribe((data) => {
      this.container = data;  // تخزين البيانات في المتغير
    });
  }

  logout() {
    // جلب جميع المستخدمين من الـ LOGGED API
    this._url.getAllLoggedUsers().subscribe({
      next: (users: any[]) => {
        if (users.length > 0) {
          // عمل طلب DELETE لكل مستخدم موجود في الـ LOGGED API
          const deleteRequests = users.map(user => this._url.removeUserFromLogged(user.id).toPromise());

          // الانتظار حتى يتم حذف جميع المستخدمين بنجاح
          Promise.all(deleteRequests).then(() => {
            console.log("✅ All users successfully removed from LOGGED API.");
            this.completeLogout('Logout Successful!', 'All logged users have been removed successfully.');
          }).catch((error) => {
            console.error("❌ Error while removing users from LOGGED API:", error);
            this.showError('Error', 'Something went wrong while logging out all users. Please try again later.');
          });
        } else {
          this.completeLogout('No Users Found', 'No users are currently logged in.');
        }
      },
      error: (error) => {
        console.error("❌ Error while fetching users from LOGGED API:", error);
        this.showError('Error', 'Something went wrong while fetching logged users. Please try again later.');
      }
    });
  }

  completeLogout(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#E72463'
    }).then((result) => {
      if (result.value) {
        this._url.userBehavior.next('');
        this.router.navigate(['/login']);
      }
    });
  }

  showError(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#E72463'
    });
  }
}
