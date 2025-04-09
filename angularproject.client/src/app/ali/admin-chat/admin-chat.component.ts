import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  messages: any[] = []; // All chat messages
  newMessage: string = ''; // Admin's new message input
  selectedFile!: File; // Selected image for sending
  usersMap: { [key: string]: any } = {}; // Stores user data by userId
  userAvatar = 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'; // Default avatar for users

  // Custom product form data
  customProductName: string = '';
  customProductPrice: number = 0;
  customProductQuantity: number = 1;
  showCustomForm: boolean = false;
  customProductFile!: File;
  selectedUserId: string = '';

  constructor(private chatService: ChatService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMessages(); // Load all messages
    this.loadUsers();    // Load all user data
    setInterval(() => {
      this.loadMessages();
    }, 3000); // 3000 ملي ثانية = 3 ثواني
  }

  // Get all chat messages
  loadMessages(): void {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  // Load all users from registration API into usersMap
  loadUsers(): void {
    this.http.get<any[]>('https://67d5f9cd286fdac89bc0e100.mockapi.io/Registration').subscribe(data => {
      data.forEach(user => {
        this.usersMap[user.id] = user;
      });
    });
  }

  // Get user name from userId
  getUserName(userId: string): string {
    const user = this.usersMap[userId];
    return user ? user.Name || user.Email : 'User';
  }

  // Get user image from userId
  getUserImage(userId: string): string {
    const user = this.usersMap[userId];
    return user?.Img || this.userAvatar;
  }

  // Send message from admin to selected user
  sendMessage(toUserId: string): void {
    if (!this.newMessage && !this.selectedFile) return;

    const messageData = {
      sender: 'admin',
      message: this.newMessage,
      image: '',
      timestamp: new Date().toISOString(),
      userId: toUserId
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

  // File selected for image message
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // File selected for custom product image
  onCustomProductImageSelected(event: any): void {
    this.customProductFile = event.target.files[0];
  }

  // Add custom product to user's cart
  addCustomProductToCart(userId: string): void {
    if (!this.customProductName || !this.customProductPrice || !this.customProductFile) {
      Swal.fire('Oops!', 'Please fill all fields including image!', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.customProductFile);

    // Upload image to ImgBB
    this.http.post<any>('https://api.imgbb.com/1/upload?key=8c8ce81a714d22cb8e6e71c2dd4dd49d', formData).subscribe({
      next: (res) => {
        const imageUrl = res.data.url;

        const product = {
          productId: Math.floor(Math.random() * 100000).toString(),
          name: this.customProductName,
          price: this.customProductPrice,
          img: imageUrl,
          quantity: this.customProductQuantity,
          message: ''
        };

        this.http.get<any[]>('https://67d6b64c286fdac89bc2c055.mockapi.io/carts').subscribe((carts) => {
          const userCart = carts.find(c => c.userId == userId);

          if (userCart) {
            userCart.products.push(product);
            this.http.put(`https://67d6b64c286fdac89bc2c055.mockapi.io/carts/${userCart.cartId}`, userCart).subscribe(() => {
              Swal.fire('✅ Added', 'Custom product added to user\'s cart!', 'success');
              this.showCustomForm = false;
            });
          } else {
            const newCart = {
              userId: userId,
              cartId: Math.floor(Math.random() * 100000).toString(),
              products: [product]
            };
            this.http.post('https://67d6b64c286fdac89bc2c055.mockapi.io/carts', newCart).subscribe(() => {
              Swal.fire('✅ Created', 'New cart created and product added!', 'success');
              this.showCustomForm = false;
            });
          }
        });
      },
      error: () => {
        Swal.fire('❌ Error', 'Failed to upload image.', 'error');
      }
    });
  }

  // Open the form to add custom product to user
  openAddToCart(msg: any): void {
    this.customProductName = msg.message || '';
    this.customProductPrice = 0;
    this.customProductQuantity = 1;
    this.customProductFile = null as any;
    this.showCustomForm = true;
  }
}
