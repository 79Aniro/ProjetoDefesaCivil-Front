import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencia.dto';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-ocoabertas',
  templateUrl: 'ocoabertas.html',
})
export class OcoabertasPage {

  items: OcorrenciaDTO[];
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public alertCrtl: AlertController,) {
  }

  ionViewDidLoad() {
this.loadData();
    
   
  }

  loadData(){

    this.ocorrenciaService.findOcoAbertas()
    .subscribe(response =>{
      this.items=response;
    },
    error => { });


    let varId = this.localStorage.getLocalUser();
    this.id_user=varId.iduser; 
    
this.funcionarioService.buscaPerfil(this.id_user).
subscribe(response => {
  this.funcionarioDto = response;
  this.perfil_user=this.funcionarioDto.perfil;
},
error => {});
    
  }

  abreRelatorios(ocorrencia_id : string) {

    if(this.perfil_user=='2'){
this.handlePermissaoNegada();
    }
    else{
      this.navCtrl.push('IRelatorioPage', {ocorrencia_id: ocorrencia_id});   
    }
  
   
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  handlePermissaoNegada() {
    let alert = this.alertCrtl.create({
      title: 'Inserir Relatorio',
      message: 'Você não tem permissão para criar relatorios',
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
