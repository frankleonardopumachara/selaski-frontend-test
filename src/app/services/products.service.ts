import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {Product, ProductI} from '../models/product'
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http: HttpClient) {
  }

  /**
   * Get products by orderId
   * @param id
   */
  getProductsByOrderId(id: number): Promise<Product[]> {
    return this.http.get<ProductI[]>(`${environment.apiUrl}/products/order/${id}`)
      .toPromise()
      .then((products) => {
        return products.map((p) => new Product(p))
      })
  }

  /**
   * Create a product
   * @param product
   * @private
   */
  private createProduct(product: Product): Promise<object> {
    return this.http.post(`${environment.apiUrl}/products`, product).toPromise()
  }

  /**
   * Update a product
   * @param product
   * @private
   */
  private updateProduct(product: Product): Promise<object> {
    return this.http.put(`${environment.apiUrl}/products/${product.idOrdersProducts}`, product).toPromise()
  }

  /**
   * Save products create or update depending on the idOrdersProducts
   * @param products
   * @param orderId
   */
  async saveProducts(products: Product[], orderId: number) {
    for (let i = 0; i < products.length; i++) {
      products[i].idOrder = orderId
      if (products[i].idOrdersProducts) {
        await this.updateProduct(products[i])
      } else {
        await this.createProduct(products[i])
      }
    }
  }

  /**
   * Delete a product by id
   * @param productId
   */
  delete(productId: number): Promise<void> {
    return this.http.delete<void>(`${environment.apiUrl}/products/${productId}`).toPromise()
  }
}
