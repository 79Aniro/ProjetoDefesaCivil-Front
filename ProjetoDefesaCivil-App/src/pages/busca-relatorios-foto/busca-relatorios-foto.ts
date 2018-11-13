import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public storage: StorageService,
    public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    let per=this.storage.getPerfil();
    
    this.relatorioService.buscaoRelatoriosFunc(localUser.iduser)
    .subscribe(response =>{
      this.items=response;
      if(per=='2'){
        this.showSemPermissão();
      }
     else if(this.items.length==0){
        this.showRelatoriosArquivados();
      }
      else{
        this.buscaUrl();
      }
      
     
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

  showRelatoriosArquivados() {
    let alert = this.alertCrtl.create({
      title: 'Inserir Fotos Relatorio',
      message: "Todos os seus Relatorios estão com Tramitação 'ARQUIVADO'",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  showSemPermissão() {
    let alert = this.alertCrtl.create({
      title: 'Inserir Fotos Relatorio',
      message: "Você não tem permissão para inserir fotos",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
