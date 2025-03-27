import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class ImageUploadServiceService {

  private uploadUrl = 'https://api.imgbb.com/1/upload';  // رابط API الخاص بـ Imgbb
  private apiKey = '8c8ce81a714d22cb8e6e71c2dd4dd49d';  // ضع مفتاح API الخاص بك هنا

  constructor(private http: HttpClient) { }

  uploadImage(imageData: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('key', this.apiKey);

    return this.http.post(this.uploadUrl, formData);
  }
}
