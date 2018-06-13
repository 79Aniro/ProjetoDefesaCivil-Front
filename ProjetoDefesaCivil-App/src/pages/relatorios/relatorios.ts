import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the RelatoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {

  items: RelatorioDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public relatorioService: RelatorioService) {
  }

  ionViewDidLoad() {
    this.relatorioService.findRelatorios()
    .subscribe(response =>{
      this.items=response;
    },
    error => { });
    
  }

  loadImageUrls(id:string, foto:string) {
    for (var i=1; i<5; i++) {
      let item = this.items[i];
      this.relatorioService.getSmallImageFromBucket(id,foto)
        .subscribe(response => {
          item.foto1 = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-${foto}.jpg`;
        },
        error => {});
    }
  } 

}
