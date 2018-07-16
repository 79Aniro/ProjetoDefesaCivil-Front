import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';

/**
 * Generated class for the MenuRelatorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-relatorio',
  templateUrl: 'menu-relatorio.html',
})
export class MenuRelatorioPage {
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public relatorioService: RelatorioService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuRelatorioPage');
  }


  relatoriosAll(){

    this.navCtrl.push('RelatoriosPage');
  
  }

  relatoriosOcorrencia(){

    this.navCtrl.push('OcorrenciaBuscaRelatoriosPage');
  }

  buscaRelatoriosFoto(){

    this.navCtrl.push('BuscaRelatoriosFotoPage');
  }

}
