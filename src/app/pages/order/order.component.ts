import {Component, OnInit} from '@angular/core'
import {UsersService} from '../../services/users.service'
import {UserI} from '../../models/user'
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms'
import {OrdersService} from '../../services/orders.service'
import {Order} from '../../models/order'
import {ActivatedRoute, Router} from '@angular/router'
import {ProductsService} from '../../services/products.service'
import {Product} from '../../models/product'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {ProductComponent} from '../product/product.component'
import {Utils} from '../../utils'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrdersService]
})
export class OrderComponent implements OnInit {

  users: UserI[] = []
  order: Order = new Order()

  userCN = 'user'
  orderNumberCN = 'order'
  datetimeCN = 'datetime'
  providerNameCN = 'providerName'
  observationsCN = 'observations'
  totalCN = 'total'

  orderForm = new FormGroup({
    [this.userCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.orderNumberCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.providerNameCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.observationsCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.totalCN]: new FormControl({value: '', disabled: true},),
  })

  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.usersService.getAll()
    const id = +this.route.snapshot.paramMap.get('idOrder')!
    if (id !== 0) {
      await this.loadOrderAndProducts(id)
    }
  }

  /**
   * util method to get a FormControl from the form defeined
   * @param controlName
   */
  formControl(controlName: string): AbstractControl {
    return this.orderForm.get(controlName)!
  }

  /**
   * Load order and its products from api
   * @param id
   */
  async loadOrderAndProducts(id: number) {
    this.order = await this.ordersService.getOne(id)
    this.order.saveProducts(await this.productsService.getProductsByOrderId(this.order.idOrder!))
    this.loadForm()
  }

  /**
   * Load form values from the order loaded
   */
  loadForm(): void {
    this.formControl(this.userCN).setValue(this.order.idUser)
    this.formControl(this.orderNumberCN).setValue(this.order.orderNumber)
    this.formControl(this.providerNameCN).setValue(this.order.providerName)
    this.formControl(this.observationsCN).setValue(this.order.observation)
    this.formControl(this.totalCN).setValue(this.order.totalValue)
  }

  /**
   * Update form total value
   * @param total
   * @private
   */
  private updateTotalValue(total: number): void {
    this.formControl(this.totalCN).setValue(total)
  }

  /**
   * save order and its products
   */
  async save(): Promise<void> {
    this.order.idUser = this.formControl(this.userCN).value
    this.order.orderNumber = this.formControl(this.orderNumberCN).value
    this.order.providerName = this.formControl(this.providerNameCN).value
    this.order.observation = this.formControl(this.observationsCN).value
    this.order.totalValue = this.formControl(this.totalCN).value || this.order.totalValue
    this.order.dateTime = Utils.toDatetime(this.order.dateTime)

    const orderId = await this.ordersService.save(this.order)
    await this.productsService.saveProducts(this.order.products, orderId)
    this.router.navigateByUrl('/orders-list')
  }

  /**
   * Delete a product
   * @param order
   * @param product
   */
  deleteProduct(order: Order, product: Product) {
    order.deleteProduct(product)
    this.productsService.delete(product.idOrdersProducts)
  }

  /**
   * open product modal to create or edit a product
   * @param product
   */
  openProduct(product: Product = new Product()) {
    const modalRef = this.modalService.open(ProductComponent)
    modalRef.componentInstance.product = product
    modalRef.result
      .then((product: Product) => {
        this.order.saveProduct(product)
        this.updateTotalValue(this.order.totalValue)
      })
      .catch(err => {
      })
  }
}
