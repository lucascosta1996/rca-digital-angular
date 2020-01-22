import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

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
      case url.endsWith('/products') && method === 'GET':
        return getProducts();
      default:
        return next.handle(request);
      }  
    }

    function getProducts() {
        return ok(products);
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