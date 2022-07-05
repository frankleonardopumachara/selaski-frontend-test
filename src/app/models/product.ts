export interface ProductI {
  idOrdersProducts: number
  idOrder: number
  valueUnit: number
  unit: string
  description: string
  sku: string
  quantity: number
  qtyBox: number
  weight: number
  volumen: number
  mark: string
  status: boolean
}

export class Product implements ProductI {
  id: number | null = null
  description: string = ''
  idOrder: number = 0
  idOrdersProducts: number = 0
  mark: string = ''
  qtyBox: number = 0
  quantity: number = 0
  sku: string = ''
  status: boolean = true
  unit: string = ''
  valueUnit: number = 0
  volumen: number = 0
  weight: number = 0

  constructor(product?: ProductI) {
    if (!product) return

    this.idOrdersProducts = product.idOrdersProducts
    this.idOrder = product.idOrder
    this.description = product.description
    this.idOrdersProducts = product.idOrdersProducts
    this.mark = product.mark
    this.qtyBox = product.qtyBox
    this.quantity = product.quantity
    this.sku = product.sku
    this.status = product.status
    this.unit = product.unit
    this.valueUnit = product.valueUnit
    this.volumen = product.volumen
    this.weight = product.weight
  }
}
