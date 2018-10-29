import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-ocofechadas',
  templateUrl: 'ocofechadas.html',
})
export class OcofechadasPage {
  page: number = 0;
  items: OcorrenciaDTO[]= [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public loadingCtrl: LoadingController,
    public localStorage: StorageService,
    public alertCrtl: AlertController, ){
  }

  ionViewDidLoad() {

  this.loadData();
    
  }



  loadData() {
    let loader = this.presentLoading();
    this.ocorrenciaService.findOcoFechadas(this.page,3)
      .subscribe(response => {
        
        this.items = this.items.concat(response['content']);
        loader.dismiss();
       
      },
        error => { loader.dismiss()});      
    
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }













  buscarRelatoriosIdOco(id_ocorrencia: string) {

    this.navCtrl.push('RelatoriosOcorrenciaPage', {id_ocorrencia: id_ocorrencia});  
  }



  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
