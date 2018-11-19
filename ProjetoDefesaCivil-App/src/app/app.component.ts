import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { STORAGE_KEYS } from '../config/storage_keys.config';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string ;

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform,
     public statusBar: StatusBar, 
     public splashScreen: SplashScreen,
     public auth: AuthService,
     
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: 'MenuPage' },        
      { title: 'Ocorrencias', component: 'MenuOcorrenciaPage ' },
      { title: 'Nova Ocorrencia ', component: 'IOcorrenciaPage'},
      { title: 'Relatorios', component: 'MenuRelatorioPage ' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Logout', component: ''},
      
   
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if(localStorage.getItem(STORAGE_KEYS.localUser)==null){

      this.rootPage='HomePage'
    }
    else{
      this.rootPage='MenuPage'
    }
  }

  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Logout':
      this.auth.logout();
      this.nav.setRoot('HomePage');
      break;
      case 'Menu':      
      this.nav.setRoot('MenuPage');
      break;
      case 'Ocorrencias':    
      this.nav.setRoot('MenuOcorrenciaPage');
      break;
      case 'Relatorios':    
      this.nav.setRoot('MenuRelatorioPage');
      break;
      case 'Profile':    
      this.nav.setRoot('ProfilePage');
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}