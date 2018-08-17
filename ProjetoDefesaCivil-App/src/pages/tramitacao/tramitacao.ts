import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-tramitacao',
  templateUrl: 'tramitacao.html',
})
export class TramitacaoPage {
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  items: RelatorioDTO[];
  cod: string;
  url:string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;

    this.relatorioService.buscaoRelatoriosFunc(this.id_user).
      subscribe(response => {
        this.items = response;
      })
      this.buscaUrl();
  }

  buscaUrl(): string{

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }

  tramitar(id_relatorio) {
   
    this.handleTramitacao(id_relatorio);
   
  }

  handleTramitacao(id_relatorio) {
    let alert = this.alertCrtl.create({
      title: 'Tramitacao',
      message: 'Escolha a opção',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'PARA_PROV_DC',
          handler: () => {
            this.cod = "2",
           
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
          
          
        },

        {
          text: 'RESOLVIDO',
          handler: () => {
            this.cod = "3",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        },
        {
          text: 'ARQUIVO',
          handler: () => {
            this.cod = "4",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        },

        {
          text: 'PARA_PROV_OUTROS',
          handler: () => {
            this.cod = "5",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            
          }
        },
      ]
    }
  );
  this.relatorioService.tramitar(id_relatorio, this.cod);
  
  
    alert.present();
  }


}
