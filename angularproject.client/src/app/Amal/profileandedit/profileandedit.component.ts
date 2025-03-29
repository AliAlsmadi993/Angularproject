

import { Component, OnInit } from '@angular/core';
import { SaService } from '../sa.service';
import { Router } from '@angular/router';
import { ImageUploadServiceService } from '../image-upload-service.service';

@Component({
  selector: 'app-profileandedit',
  templateUrl: './profileandedit.component.html',
  styleUrls: ['./profileandedit.component.css']
})
export class ProfileandeditComponent implements OnInit {
  user: any;
  editableUser: any = {};
  userId: string = '';
  isLoading: boolean = true;

  // متغيرات خاصة بالرفع 
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  loading: boolean = false;

  constructor(private _ser: SaService, private router: Router, private imageUploadService: ImageUploadServiceService) { }

  ngOnInit() {
    this.getUserIdFromLoggedApi();
  }

  getUserIdFromLoggedApi(): void {
    this._ser.checkLoggedStatus().subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          const loggedUser = response.find((user: any) => user.userId);

          if (loggedUser && loggedUser.userId) {
            this.userId = loggedUser.userId;
            console.log('✅ Found User ID from Logged API:', this.userId);
            this.getUserProfile();
          } else {
            console.error('❌ No userId found. Redirecting to login.');
            this.router.navigate(['/login']);
          }
        } else {
          console.error('❌ No users found in the Logged API. Redirecting to login.');
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('❌ Error fetching user from Logged API:', error);
        this.router.navigate(['/login']);
      }
    );
  }

  getUserProfile(): void {
    this._ser.getUserProfile(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.editableUser = { ...this.user };
        console.log('✅ User profile loaded successfully:', this.user);
        this.isLoading = false;
      },
      (error) => {
        console.error('❌ Error fetching user profile:', error);
        this.isLoading = false;
      }
    );
  }

  updateProfile(): void {
    this._ser.postdata(this.userId, this.editableUser).subscribe(
      () => {
        this.user = { ...this.editableUser };
        alert("Profile updated successfully!");
      },
      (error) => {
        console.error('❌ Error updating profile:', error);
      }
    );
  }

  // لرفع الصورة
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editableUser.Img = reader.result as string;
      };
    } else {
      this.selectedFile = null;
    }
  }

  // دالة رفع الصورة إلى API
  uploadImage(file: File): void {
    if (file) {
      this.loading = true;
      this.imageUploadService.uploadImage(file).subscribe(
        (response: { data: { url: string; }; }) => {
          this.uploadedImageUrl = response.data.url;
          this.editableUser.Img = this.uploadedImageUrl;
          this.loading = false;
          console.log('Uploaded Image URL:', this.uploadedImageUrl);
        },
        (error: any) => {
          console.error('Image Upload Error:', error);
          this.loading = false;
        }
      );
    }
  }
}

