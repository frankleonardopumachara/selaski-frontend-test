import {Component, Input, OnInit} from '@angular/core'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms'
import {Product} from '../../models/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  valueUnitCN = 'valueUnit'
  unitCN = 'unit'
  descriptionCN = 'description'
  skuCN = 'sku'
  quantityCN = 'quantity'
  qtyBoxCN = 'atyBox'
  weightCN = 'weight'
  volumenCN = 'volumen'
  markCN = 'mark'

  productForm = new FormGroup({
    [this.valueUnitCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.unitCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.descriptionCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.skuCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.quantityCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.qtyBoxCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.weightCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.volumenCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
    [this.markCN]: new FormControl({value: '', disabled: false}, [Validators.required]),
  })

  @Input() product!: Product

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.loadForm()
  }

  /**
   * Load product into the form and disable sku on edit
   */
  loadForm() {
    this.formControl(this.valueUnitCN).setValue(this.product.valueUnit)
    this.formControl(this.unitCN).setValue(this.product.unit)
    this.formControl(this.descriptionCN).setValue(this.product.description)
    this.formControl(this.skuCN).setValue(this.product.sku)
    this.formControl(this.quantityCN).setValue(this.product.quantity)
    this.formControl(this.qtyBoxCN).setValue(this.product.qtyBox)
    this.formControl(this.weightCN).setValue(this.product.weight)
    this.formControl(this.volumenCN).setValue(this.product.volumen)
    this.formControl(this.markCN).setValue(this.product.mark)

    if (this.product.idOrdersProducts) {
      this.formControl(this.skuCN).disable()
    }
  }

  /**
   * util method to get a form control
   * @param controlName
   */
  formControl(controlName: string): AbstractControl {
    return this.productForm.get(controlName)!
  }

  /**
   * Update product values and close modal
   */
  saveProduct(): void {
    this.product.valueUnit = this.formControl(this.valueUnitCN).value
    this.product.unit = this.formControl(this.unitCN).value
    this.product.description = this.formControl(this.descriptionCN).value
    this.product.sku = this.formControl(this.skuCN).value
    this.product.quantity = this.formControl(this.quantityCN).value
    this.product.qtyBox = this.formControl(this.qtyBoxCN).value
    this.product.weight = this.formControl(this.weightCN).value
    this.product.volumen = this.formControl(this.volumenCN).value
    this.product.mark = this.formControl(this.markCN).value
    this.activeModal.close(this.product)
  }
}
