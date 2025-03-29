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
  showPopup: boolean = false;
  currentTargetUserId!: number;
  userAvatar: string = 'https://m.media-amazon.com/images/I/81OXEQrFPTL._AC_UF1000,1000_QL80_.jpg';

  productForm = {
    productId: '100',
    name: '',
    price: 0,
    quantity: 1,
    img: '',
    message: ''
  };

  constructor(private chatService: ChatService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (!this.newMessage && !this.selectedFile) return;

    const messageData: any = {
      sender: 'admin',
      message: this.newMessage,
      image: '',
      timestamp: new Date().toISOString(),
      userId: this.currentTargetUserId
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

  openAddToCartPopup(userId: number): void {
    this.currentTargetUserId = userId;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  addToUserCart(): void {
    const product = { ...this.productForm };

    this.chatService.addProductToUserCart(this.currentTargetUserId, product).subscribe(() => {
      alert('✅ Product added to user cart!');
      this.closePopup();
    });
  }
}
