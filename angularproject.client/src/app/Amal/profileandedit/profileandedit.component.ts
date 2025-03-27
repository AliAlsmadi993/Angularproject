import { Component, OnInit } from '@angular/core';
import { SaService } from '../sa.service';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadServiceService } from '../image-upload-service.service';

@Component({
  selector: 'app-profileandedit',
  templateUrl: './profileandedit.component.html',
  styleUrl: './profileandedit.component.css'
})

export class ProfileandeditComponent implements OnInit {
  user: any;
  editableUser: any = {};
  userId: string = '';
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';  // لحفظ رابط الصورة المرفوعة
  loading: boolean = false;  // لمعرفة حالة الرفع

  constructor(private _ser: SaService, private route: ActivatedRoute, private imageUploadService: ImageUploadServiceService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this._ser.getdata(this.userId).subscribe((data) => {
        this.user = data;
        this.editableUser = { ...this.user };
      });
    }
  }

  // دالة لتحميل الصورة
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editableUser.Img = reader.result as string; // لتحميل الصورة وتحويلها إلى base64
      };
    } else {
      this.selectedFile = null;
    }
  }


  // دالة لرفع الصورة إلى API
  uploadImage(file: File): void {
    if (file) {
      this.loading = true; // تفعيل حالة الرفع
      this.imageUploadService.uploadImage(file).subscribe(
        (response: { data: { url: string; }; }) => {
          this.uploadedImageUrl = response.data.url; // تخزين رابط الصورة المرفوعة
          this.editableUser.Img = this.uploadedImageUrl; // تحديث الصورة في البيانات
          this.loading = false; // إلغاء حالة الرفع
          console.log('Uploaded Image URL:', this.uploadedImageUrl);
        },
        (error: any) => {
          console.error('Image Upload Error:', error);
          this.loading = false; // إلغاء حالة الرفع في حال حدوث خطأ
        }
      );
    }
  }

  // دالة لتحديث الـ profile
  updateProfile() {
    this._ser.postdata(this.userId, this.editableUser).subscribe(() => {
      this.user = { ...this.editableUser }; // تحديث البيانات في الواجهة
      alert("Profile updated successfully!"); // عرض رسالة نجاح التحديث
    });
  }
}
