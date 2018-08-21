import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { API_CONFIG } from '../../config/api.config';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';



@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {

  items: RelatorioDTO[];
 url:string;
 id_user: string;
 funcionarioDto: FuncionarioDTO;
 perfil_user: string;
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

    this.funcionarioService.buscaPerfil(this.id_user).
      subscribe(response => {
        this.funcionarioDto = response;
        this.perfil_user = this.funcionarioDto.perfil;
        this.loadData();
       
      },
        error => { });

     
   
    
  }
loadData(){

  
 
    this.relatorioService.buscaoRelatoriosFunc(this.id_user)
    .subscribe(response =>{
      this.items=response;
      this.buscaUrl();
     
     
      

     
    },
    error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
   
  
}
 

  buscaUrl(): string{

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }

  handlePermissaoNegada() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio PDF',
      message: 'Não autorizado a gerar relatorio',
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

  geraPdf(id_relatorio){
    
    this.relatorioService.gerarPdfRelatorio(id_relatorio)
    .subscribe(response => {
        
      this.handleRelatorioPDFCriado();
     
    },
      error => { });

    
  }

  handleRelatorioPDFCriado() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio PDF',
      message: 'Relatorio PDF criando com Sucesso',
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
  buscarRelatoriosIdRel(id_relatorio: string) {

    this.navCtrl.push('RelatorioPdfPage', {id_relatorio: id_relatorio});  
  }
 
}
