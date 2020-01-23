import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainPageRoutes } from '@app/mainPage/mainPage.routing';
import { MainPageComponent } from '@app/mainPage/mainPage/mainPage.component';
import { CartComponent } from '@app/components/cart/cart.component';
import { ProductComponent } from '@app/components/product/product.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(MainPageRoutes)
  ],
  declarations: [
    MainPageComponent,
    CartComponent,
    ProductComponent,
  ]
})
export class MainPageModule {}
