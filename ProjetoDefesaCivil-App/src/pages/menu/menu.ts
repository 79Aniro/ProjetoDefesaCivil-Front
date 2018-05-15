import { Component } from '@angular/core';

import { NavController, IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController) {

  }

  insereOco(){

    this.navCtrl.push('IOcorrenciaPage');
  
  }

  insereRelatorio(){

    this.navCtrl.push('IRelatorioPage');
  
  }

  ocorrenciasAbertas(){

    this.navCtrl.push('OcoabertasPage');
  
  }

}


