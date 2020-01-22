import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { Product } from '@app/models/product';
import { ProductService } from '@app/services/product.service';

@Component({
	templateUrl: 'product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

	private products: Product[];
	cartAmount = JSON.parse(localStorage.getItem('cart')).length

	constructor(
    private http: HttpClient,
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

	isProductOnCart( id: any ) {
		if ( localStorage.getItem('cart') ) {
			const cart = JSON.parse(localStorage.getItem( 'cart' ));
			const isOnCart = cart.filter( ( item: any ) => JSON.parse(item).product.id === id )
			this.cartAmount = cart.length

			return isOnCart.length > 0;
		}
	}

	removeProductFromCart(id: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };

    return this.http.delete( `/cart/remove`, options )
      .pipe(first())
      .subscribe();
	}

}