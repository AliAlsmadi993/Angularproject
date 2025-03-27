import { Component } from '@angular/core';
import { AdnanService } from '../service/adnan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _ser: AdnanService,private router: Router) { }

  ngOnInit() {

  }
  postData(data: any) {
    this._ser.postNewUser(data).subscribe({
      next: () => {
        alert("New user added successfully!");
        // Navigate to the login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Handle any errors here
        console.error('Error adding user:', err);
        alert("Failed to add user.");
      }
    });
  }

}
