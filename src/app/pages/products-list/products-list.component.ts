import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Product} from '../../models/product'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() products: Product[] = []
  @Output() select = new EventEmitter<Product>()
  @Output() delete = new EventEmitter<Product>()

  constructor() {
  }

  ngOnInit(): void {
  }
}
