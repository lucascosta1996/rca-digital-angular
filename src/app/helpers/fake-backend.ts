import { Injectable, ɵConsole } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Item } from '@app/models/item';
import { ProductService } from '@app/services/product.service';

let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  items: Item[] = [];
  
  constructor(
		productService: ProductService
  ) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;
    console.log('params', request)
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
      case url.endsWith('/users/authenticate') && method === 'POST':
        return authenticate();
      case url.endsWith('/users/register') && method === 'POST':
        return register();
      case url.endsWith('/cart/add') && method === 'POST':
        return addCartProduct();
      case url.endsWith('/cart/remove') && method === 'DELETE':
        return removeCartProduct();
      case url.endsWith('/cart/quantity') && method === 'PUT':
        return changeCartProductQuantity();
      case url.endsWith('/cart/update') && method === 'PUT':
        return updateCurrentUserCart(cart);
      case url.endsWith('/products') && method === 'GET':
        return getProducts();
      default:
        return next.handle(request);
      }  
    }

    //Products functions

    function getProducts() {
        return ok(products);
    }

    function changeCartProductQuantity() {
      const { id, quantity } = body

      let cartT: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cartT.length; i++) {
        let item: Item = JSON.parse(cartT[i]);
        if (item.product.id == id) {
          if( quantity === 'plus' ) {
            item.quantity += 1;
          } else {
            if(item.quantity === 1) {
              return
            } else {
              item.quantity -= 1
            }
          }
          cartT[i] = JSON.stringify(item)
          break;
        }
      }
      
      updateCurrentUserCart(cartT)

      localStorage.setItem('cart', JSON.stringify(cartT));

      return ok({})
    }

    function addCartProduct() {
      const { id } = body
      var item: Item = {
        product: body,
        quantity: 1
      };
      
      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item: Item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      updateCurrentUserCart(localStorage.getItem('cart'))

      return ok(cart)
    }

    function removeCartProduct() {
      const { id } = body
      let cartT: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cartT.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product.id == id) {
          debugger
          cartT.splice(i, 1);
          break;
        }
      }

      updateCurrentUserCart(cartT)

      localStorage.setItem('cart', JSON.stringify(cartT));

      return ok({})
    }

    function updateCurrentUserCart(cartT: any) {
      const currentUserT = JSON.parse(localStorage.getItem('currentUser'))

      if (currentUserT) {
        const { username } = currentUserT;
        let user = users.find(( x: any ) => x.username === username);
        user.cart = JSON.stringify(cartT);
        localStorage.setItem('currentUser', JSON.stringify(user));

        for (var u in users) {
          if (users[u].username == user.username) {
             users[u].cart = JSON.stringify(cartT);
             break;
          }
        }
        localStorage.setItem('users', JSON.stringify(users))
      }
      return ok({})
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(( x: any ) => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    }

    function register() {
      const user = body

      user.id = users.length ? Math.max(...users.map(( x: any ) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok(null);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message : any) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};