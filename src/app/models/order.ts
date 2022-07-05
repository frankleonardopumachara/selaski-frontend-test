import {Product} from './product'
import * as moment from 'moment'

export interface OrderI {
  idOrder: number | null
  idUser: number
  orderNumber: number
  dateTime: string
  providerName: string
  dateCreated: string
  observation: string
  totalValue: number
  status: boolean
}

export class Order implements OrderI {
  public idOrder: number | null = null
  public idUser: number = 0
  public orderNumber: number = 0
  public dateTime: string = moment().toISOString()
  public providerName: string = ''
  public dateCreated: string = ''
  public observation: string = ''
  public totalValue: number = 0
  public status: boolean = true
  public products: Product[] = []

  constructor(order?: OrderI) {
    if (!order) return

    this.idOrder = order.idOrder
    this.idUser = order.idUser
    this.orderNumber = order.orderNumber
    this.dateTime = order.dateTime
    this.providerName = order.providerName
    this.dateCreated = order.dateCreated
    this.observation = order.observation
    this.totalValue = order.totalValue
    this.status = order.status
  }

  /**
   * Save all a list of products
   * @param products
   */
  saveProducts(products: Product[]) {
    products.forEach((p) => {
      this.saveProduct(p)
    })
  }

  /**
   * Create or update a product depending on the id
   * @param product
   */
  saveProduct(product: Product) {
    if (product.id !== null) {
      this.updateProduct(product)
    } else {
      this.addProduct(product)
    }
    this.calculateTotal()
  }

  /**
   * Add product to order
   * @param product
   * @private
   */
  private addProduct(product: Product) {
    if (this.products.length === 0) {
      product.id = 0
    } else {
      product.id = this.products[this.products.length - 1].id! + 1
    }
    this.products.push(product)
  }

  /**
   * Update a product in an order and update total value
   * @param product
   * @private
   */
  private updateProduct(product: Product) {
    this.products[product.id!] = product
  }

  /**
   * Delete a product from an order and update total value
   * @param product
   */
  deleteProduct(product: Product) {
    this.products = this.products.filter((p) => p.id !== product.id)
    this.calculateTotal()
  }

  /**
   * Calculate the total value of the order
   * @private
   */
  private calculateTotal(): void {
    this.totalValue = this.products.reduce((sum, product) => sum + product.quantity * product.valueUnit, 0)
  }
}
