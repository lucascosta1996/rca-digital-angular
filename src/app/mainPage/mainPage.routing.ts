import { Routes } from '@angular/router';

import { MainPageComponent } from '@app/mainPage/mainPage/mainPage.component';
import { CartComponent } from '@app/components/cart/cart.component';
import { ProductComponent } from '@app/components/product/product.component';

export const MainPageRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
];
