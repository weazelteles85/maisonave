import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { CoreModule } from './core/core.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/token.interceptor';
import { HttpModule } from '@angular/http';
import { UserSourcesComponent } from './my-files/user-sources/user-sources.component';
import { PaymentFormComponent } from './my-files/payment/payment-form/payment-form.component';
import { StripePipe } from './stripe.pipe';
import { PaymentService } from './my-files/payment/payment.service';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    //UserSourcesComponent, 
    //PaymentFormComponent,
    //StripePipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    PaymentService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
