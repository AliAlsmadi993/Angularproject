import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  messages: any[] = [];
  newMessage: string = '';
  selectedFile!: File;
  users: any[] = [];

  userAvatar = 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'; // صورة الأدمن الافتراضية
  currentUserId = '63'; // ← ID المستخدم الحالي الذي تتحدث معه

  constructor(private chatService: ChatService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMessages();
    this.loadUsers();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data.filter(m => m.userId == this.currentUserId);
    });
  }

  loadUsers(): void {
    this.http.get<any[]>('https://67d5f9cd286fdac89bc0e100.mockapi.io/Registration').subscribe(data => {
      this.users = data;
    });
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.id == userId);
    return user ? user.Name || user.Email : 'User';
  }

  getUserImage(userId: string): string {
    const user = this.users.find(u => u.id == userId);
    return user?.Img || this.userAvatar;
  }

  sendMessage(): void {
    if (!this.newMessage && !this.selectedFile) return;

    const messageData = {
      sender: 'admin',
      message: this.newMessage,
      image: '',
      timestamp: new Date().toISOString(),
      userId: this.currentUserId
    };

    if (this.selectedFile) {
      this.chatService.sendMessageWithImage(messageData, this.selectedFile).subscribe(() => {
        this.loadMessages();
      });
    } else {
      this.chatService.sendTextMessage(messageData).subscribe(() => {
        this.loadMessages();
      });
    }

    this.newMessage = '';
    this.selectedFile = null as any;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
