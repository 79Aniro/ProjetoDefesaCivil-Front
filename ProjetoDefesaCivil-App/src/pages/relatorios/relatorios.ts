import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';



@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {

  items: RelatorioDTO[];
 url:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
    this.relatorioService.findRelatorios()
    .subscribe(response =>{
      this.items=response;
      this.buscaUrl();
      
     
    },
    error => { });
    
  }

 

  buscaUrl(): string{

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }

 
}
