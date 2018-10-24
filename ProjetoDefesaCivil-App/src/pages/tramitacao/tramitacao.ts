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
        if(this.items.length==0){
          this.showRelatoriosArquivados();
        }
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
            this.navCtrl.setRoot('MenuRelatorioPage');
          }
          
          
        },

        {
          text: 'RESOLVIDO',
          handler: () => {
            this.cod = "3",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot('MenuRelatorioPage');
          }
        },
        {
          text: 'ARQUIVO',
          handler: () => {
            this.cod = "4",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot('MenuRelatorioPage');
          }
        },

        {
          text: 'PARA_PROV_OUTROS',
          handler: () => {
            this.cod = "5",
            this.relatorioService.tramitar(id_relatorio,this.cod).
            subscribe(response=>{
              
            });
            this.navCtrl.setRoot('MenuRelatorioPage');
            
          }
        },
      ]
    }
  );
  this.relatorioService.tramitar(id_relatorio, this.cod);
  
  
    alert.present();
  }

  showRelatoriosArquivados() {
    let alert = this.alertCrtl.create({
      title: 'Tramitação Relatórios',
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

}
