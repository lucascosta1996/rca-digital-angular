import { Component, OnInit } from '@angular/core';

import { Product } from '@app/models/product';
import { ProductService } from '@app/services/product.service';

@Component({
	templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit {

	private products: Product[];

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.products = this.productService.findAll();
	}

	findProduct(id: any) {
		return this.productService.find(id)
	}

	addProductToCart(id: any) {
		this.productService.addProductToCart( this.productService.find(id) )
	}

}