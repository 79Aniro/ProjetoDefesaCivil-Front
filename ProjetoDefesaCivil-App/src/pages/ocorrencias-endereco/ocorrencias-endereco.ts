import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '../../../node_modules/ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-ocorrencias-endereco',
  templateUrl: 'ocorrencias-endereco.html',
})
export class OcorrenciasEnderecoPage {
  parametro: string;
  regiao: string;
  items: OcorrenciaDTO[]=[];
  formGroup: FormGroup;
  dataInicial:string;
  dataFinal:string;
  page: number = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public alertCrtl: AlertController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {
  }


  ionViewDidLoad() {

    this.loadData();
 
   }
  buscarRelatoriosIdOco(id_ocorrencia: string) {

    this.navCtrl.push('RelatoriosOcorrenciaPage', { id_ocorrencia: id_ocorrencia });
  }
  loadData() {
    let loader = this.presentLoading();
    this.parametro = this.navParams.get('parametro');
    
    this.regiao = this.navParams.get('regiaoPar');
    if (this.parametro == "Regiao") {
      this.ocorrenciaService.ocoRegiaoPage(this.regiao,this.page,3).
        subscribe(response => {
          this.items = this.items.concat(response['content']);
          
          loader.dismiss();         
          if (this.items.length == 0) {
            this.handleOcoRegiao();
          }
        },
        error => { loader.dismiss()});
    }
    else if(this.parametro=="Periodo"){

      this.dataInicial=this.navParams.get('dataInicial');
      this.dataFinal=this.navParams.get('dataFinal');
      this.ocorrenciaService.ocoDataAberturaBetween(this.dataInicial,this.dataFinal,this.page,3).
      subscribe(response=>{
        this.items = this.items.concat(response['content']);
        
        loader.dismiss();  
        if (this.items.length == 0) {
          this.handleOcoPerido();
        }
      })
    }
  }

 




  handleOcoAbertasAll() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Atendidas',
      message: 'Não há ocorrências Atendidas',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }

  handleOcoPerido() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Periodo',
      message: 'Não há ocorrências neste periodo',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }

  handleOcoRegiao() {
    let alert = this.alertCrtl.create({
      title: 'Ocorrencias Regiao',
      message: 'Não há ocorrências nesta região',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuOcorrenciaPage');
          }
        }
      ]
    });
    alert.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
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
