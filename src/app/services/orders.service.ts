import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {Order, OrderI} from '../models/order'
import {ProductsService} from './products.service'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    private readonly http: HttpClient,
    private readonly productsService: ProductsService,
  ) {
  }

  /**
   * get all orders
   */
  getAll(): Promise<Order[]> {
    return this.http.get<OrderI[]>(`${environment.apiUrl}/orders`)
      .toPromise()
      .then((orders) => {
        return orders.map((order) => new Order(order))
      })
  }

  /**
   * Create an order
   * @param order
   */
  private async create(order: Order): Promise<number> {
    const {insertId} = await this.http.post<any>(`${environment.apiUrl}/orders`, order).toPromise()
    return insertId
  }

  /**
   * Update an order
   * @param order
   */
  update(order: Order) {
    return this.http.put(`${environment.apiUrl}/orders/${order.idOrder}`, order).toPromise()
  }

  /**
   * Get an order by id
   * @param orderId
   */
  getOne(orderId: number): Promise<Order> {
    return this.http.get<OrderI>(`${environment.apiUrl}/orders/${orderId}`)
      .toPromise()
      .then((order) => {
        return new Order(order)
      })
  }

  /**
   * Save an order choose between create or update depending on the idOrder
   * @param order
   */
  async save(order: Order): Promise<number> {
    if (order.idOrder) {
      this.update(order)
      return order.idOrder
    } else {
      return this.create(order)
    }
  }

  /**
   * Delete order by Id
   * @param orderId
   */
  private delete(orderId: number): Promise<void> {
    return this.http.delete<void>(`${environment.apiUrl}/orders/${orderId}`).toPromise()
  }

  /**
   * Delete order and its products
   * @param order
   */
  async deleteOrderAndProducts(order: OrderI): Promise<void> {
    try {
      const products = await this.productsService.getProductsByOrderId(order.idOrder!)
      await this.delete(order.idOrder!)
      for (let i = 0; i < products.length; i++) {
        await this.productsService.delete(products[i].idOrdersProducts)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
