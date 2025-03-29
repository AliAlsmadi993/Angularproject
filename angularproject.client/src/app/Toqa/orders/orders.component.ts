
import { Component } from '@angular/core';
import { AdminService } from '../../Admin Services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  constructor(private _admin: AdminService) { }

  orders: any[] = [];
  usersWithOrders: any[] = []; // keep the original full response

  ngOnInit() {
    this.ShowAllOrders();
  }

  ShowAllOrders() {
    this._admin.ShowAllOrders().subscribe((data: any[]) => {
      this.usersWithOrders = data;

      const allOrders: any[] = [];

      data.forEach(user => {
        user.orderData.forEach((order: any) => {
          allOrders.push({
            ...order,
            userId: user.id // attach the user ID to each order
          });
        });
      });

      this.orders = allOrders;
      console.log(this.orders);
    });
  }

  updateStatus(order: any) {
    console.log(`Order ${order.userId} status changed to:`, order.status);

    // Get all orders for this user
    const updatedOrders = this.orders
      .filter(o => o.userId === order.userId)
      .map(o => {
        // Update the order with matching date (assuming date is unique)
        if (o.date === order.date) {
          return { ...o, status: order.status };
        }
        return o;
      });

    // Send the updated array to the backend
    this._admin.UpdateOrder(order.userId, { orderData: updatedOrders }).subscribe(() => {
      console.log(`Updated all orders for user ${order.userId}`);
    });
  }
}

