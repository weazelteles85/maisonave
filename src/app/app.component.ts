import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  windowSize: number;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Tax Preparation',
      url: '/tax-preparation',
      icon: 'analytics'
    },
    {
      title: 'Payroll Services',
      url: '/payroll',
      icon: 'logo-usd'
    },
    {
      title: 'Bookkeeping',
      url: '/bookkeeping',
      icon: 'book'
    },
    {
      title: 'Business Services',
      url: '/business-services',
      icon: 'briefcase'
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: 'call'
    },
    {
      title: 'My Files',
      url: '/my-files',
      icon: 'person'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'book'
    },
    {
      title: 'Schedule',
      url: '/scheduler',
      icon: 'calendar'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.windowSize = window.innerWidth;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
