import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '@app/models/product';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[];

  constructor(
    private http: HttpClient
  ) {
    this.products = [
      { id: 'p01', name: 'TLOU 2', price: 199, photo: 'https://s3.amazonaws.com/comparegame/thumbnails/42666/large.jpg', platform: 'PS4' },
      { id: 'p02', name: 'Cyberpunk 2077', price: 200, photo: 'https://http2.mlstatic.com/cyberpunk-2077-pre-venda-16042020-ps4-midia-fisica-D_NQ_NP_649862-MLB31304901937_072019-F.jpg', platform: 'PS4, PC, XBOX' },
      { id: 'p03', name: 'Days Gone', price: 127, photo: 'https://http2.mlstatic.com/days-gone-ps4-D_NQ_NP_646055-MLB32044938716_092019-F.jpg', platform: 'PS4' },
      { id: 'p04', name: 'God of War', price: 60, photo: 'https://www.mobygames.com/images/covers/l/501232-god-of-war-playstation-4-front-cover.jpg', platform: 'PS4' }
    ];
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  addProductToCart(product: Product) {
    return this.http.post(`/cart/add`, product)
        .pipe(first())
        .subscribe()
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }
}