import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { RelatorioDTO } from '../../models/relatorio.dto';



@IonicPage()
@Component({
  selector: 'page-busca-relatorios-foto',
  templateUrl: 'busca-relatorios-foto.html',
})
export class BuscaRelatoriosFotoPage {

  items: RelatorioDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
    this.relatorioService.findRelatorios()
    .subscribe(response =>{
      this.items=response;
     
    },
    error => { });
    
  }

  insereFotoRelatorio(relatorio_id:string){

    this.navCtrl.push('InsereFotoPage', {relatorio_id: relatorio_id});  

  }


  
}
