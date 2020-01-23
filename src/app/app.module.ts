import * as $ from 'jquery';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule  } from '@angular/forms'

import { NavbarComponent } from '@app/components/navbar/navbar.component';
import { LoginComponent } from './login';
import { fakeBackendProvider } from './helpers';
import { ProductService } from './services';

import { AppRoutes } from '@app/app.routing';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@app/shared';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    BannerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    fakeBackendProvider,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
