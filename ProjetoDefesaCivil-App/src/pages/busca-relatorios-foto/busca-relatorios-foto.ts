import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';



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
    public relatorioService: RelatorioService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    
    this.relatorioService.buscaoRelatoriosFunc(localUser.iduser)
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
