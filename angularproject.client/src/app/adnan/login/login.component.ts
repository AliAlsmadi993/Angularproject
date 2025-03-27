import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdnanService } from '../service/adnan.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _ser: AdnanService, private router: Router) { }

  ngOnInit() { }

  userData: any;

  getData(enteredUser: any) {
    this._ser.getAllUsers().subscribe({
      next: (data: any[]) => {

        let user = data.find((p: any) => p.Email === enteredUser.Email && p.Password === enteredUser.password);

        this.userData = user;

        if (enteredUser.Email == "Admin@gmail.com" && enteredUser.password == 123) {
          this._ser.userBehavior.next("Admin@gmail.com");
          alert("Admin login successful");
          this.router.navigate(['/dashboard']);
        }

        else if (user) {
          this._ser.userBehavior.next(user.Email);

          // ✅ تجهيز البيانات المراد إرسالها إلى API LOGGED
          const userToLog = {
            userId: user.id,   // جعل userId مساوي لـ id
            Name: user.Name,
            Email: user.Email
          };

          // إرسال المستخدم إلى API LOGGED
          this._ser.validateUser(userToLog).subscribe({
            next: (response) => {
              console.log("✅ User successfully added to LOGGED API:", response);
              alert("Login successful and user added to LOGGED API!");
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error("❌ Error while adding user to LOGGED API:", error);
              alert("Login successful, but failed to add user to LOGGED API.");
            }
          });

        } else {
          alert("Invalid Email or Password");
        }
      },
      error: (error) => {
        console.error("❌ Error during login:", error);
      }
    });
  }
}
