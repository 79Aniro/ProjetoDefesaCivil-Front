import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-busca-relatorios-foto',
  templateUrl: 'busca-relatorios-foto.html',
})
export class BuscaRelatoriosFotoPage {

  items: RelatorioDTO[];
  url:string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
    this.relatorioService.buscaoRelatoriosFunc()
    .subscribe(response =>{
      this.items=response;
      this.buscaUrl();
     
    },
    error => { });
    
  }

  insereFotoRelatorio(relatorio_id:string){

    this.navCtrl.push('InsereFotoPage', {relatorio_id: relatorio_id});  

  }

  buscaUrl(): string{

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }

  
}
