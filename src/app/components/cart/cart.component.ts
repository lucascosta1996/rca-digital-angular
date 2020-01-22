import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Item } from '@app/models/item';
import { Subscription } from 'rxjs';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services'
import { first } from 'rxjs/operators';

@Component({
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

	private items: Item[] = [];
	private total: number = 0;

	constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
	) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

	ngOnInit() {
    // if( this.currentUser && JSON.parse(localStorage.getItem( 'cart' )).length === 0 ) {
    //   const users = JSON.parse(localStorage.getItem('users')) || [];
    //   const user = users.find( ( x: any ) => x.username === this.currentUser.username )

    //   if ( user && user.cart ) {
    //     localStorage.setItem( 'cart', user.cart )
    //   }
    // }

    if ( localStorage.getItem('cart') == null ) {
      let cart: any = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      this.loadCart()
    } else {
      this.loadCart()
    }
  }

	loadCart(): void {
		this.total = 0;
    this.items = [];

    let cart = JSON.parse(localStorage.getItem('cart'));
    
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
  }
  
  changeQuantity(id: any, quantity: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      id: id,
      quantity: quantity
    };

    return this.http.put( `/cart/quantity`, options )
      .pipe()
      .subscribe( (s) => {
        this.loadCart();
      } );
  }

	remove(id: any) {
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
      .subscribe( (s) => {
        this.loadCart();
      } );
	}


}