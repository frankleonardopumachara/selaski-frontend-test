import {Component, OnInit} from '@angular/core'
import {OrdersService} from '../../services/orders.service'
import {Order, OrderI} from '../../models/order'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders: OrderI[] = []

  constructor(
    private readonly ordersService: OrdersService,
    private readonly modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getOrders()
  }

  /**
   * Get all orders
   */
  getOrders(): void {
    this.ordersService
      .getAll()
      .then((orders) => this.orders = orders)
  }

  /**
   * delete an order and its products
   * @param content
   * @param order
   */
  deleteOrder(content: any, order: OrderI): void {
    this.modalService.open(content)
      .result
      .then(async () => {
        await this.ordersService.deleteOrderAndProducts(order)
        this.getOrders()
      })
      .catch(err => {
      })
  }
}
