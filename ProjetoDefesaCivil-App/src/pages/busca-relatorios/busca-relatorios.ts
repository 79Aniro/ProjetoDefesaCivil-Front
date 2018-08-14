import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular/umd';



@IonicPage()
@Component({
  selector: 'page-busca-relatorios',
  templateUrl: 'busca-relatorios.html',
})
export class BuscaRelatoriosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaRelatoriosPage');
  }

}
