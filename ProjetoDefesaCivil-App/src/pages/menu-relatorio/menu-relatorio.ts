import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular/umd';
import { RelatorioService } from '../../services/domain/relatorio.service';



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

  tramitacaoRelatorios(){


    this.navCtrl.push('TramitacaoPage');
  }

  

}
