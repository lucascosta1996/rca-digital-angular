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
      { id: 'p01', name: 'TLOU 2', price: 199, photo: '../../assets/images/tlofu.png', platform: 'PS4' },
      { id: 'p02', name: 'Cyberpunk 2077', price: 200, photo: '../../assets/images/cyber.png', platform: 'PS4, PC, XBOX' },
      { id: 'p03', name: 'Days Gone', price: 127, photo: '../../assets/images/days.png', platform: 'PS4' },
      { id: 'p04', name: 'God of War', price: 60, photo: '../../assets/images/gow.png', platform: 'PS4' }
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