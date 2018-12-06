import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { FuncionarioDTO } from '../../models/funcionario.dto';




@IonicPage()
@Component({
  selector: 'page-ocorrencias-abertas-agente',
  templateUrl: 'ocorrencias-abertas-agente.html',
})
export class OcorrenciasAbertasAgentePage {

  items: OcorrenciaDTO[] = [];
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public alertCrtl: AlertController, 
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    this.loadData();
   
  }

  loadData(){
    let loader = this.presentLoading();
    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;
    this.perfil_user = this.localStorage.getPerfil();

    this.ocorrenciaService.ocoAgente(this.id_user).
    subscribe(response=>{
      this.items=response;
      loader.dismiss();
    }),
    error=>{
      loader.dismiss();
    }

  }

  abreRelatorios(ocorrencia_id: string, agente:string) {

    if (this.perfil_user == '2') {
      this.handlePermissaoNegada();
    }
    else {
      this.navCtrl.push('IRelatorioPage', { ocorrencia_id: ocorrencia_id ,agente:agente});
    }


  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  

  handlePermissaoNegada() {
    let alert = this.alertCrtl.create({
      title: 'Inserir Relatorio',
      message: 'Você não tem permissão para criar relatorios',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
