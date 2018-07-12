import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';



@IonicPage()
@Component({
  selector: 'page-menu-ocorrencia',
  templateUrl: 'menu-ocorrencia.html',
})
export class MenuOcorrenciaPage {
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  regiao:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage: StorageService,
     public funcionarioService: FuncionarioService,
     public localStorage: StorageService,
     public alertCrtl: AlertController,) {
  }

  ionViewDidLoad() {
    let varId = this.localStorage.getLocalUser();
    this.id_user=varId.iduser; 
    
this.funcionarioService.buscaPerfil(this.id_user).
subscribe(response => {
  this.funcionarioDto = response;
  this.perfil_user=this.funcionarioDto.perfil;
},
error => {});
    
  }

  ocorrenciasAbertas(){

    this.navCtrl.push('OcoabertasPage');
  
  }

  ocorrenciasFechadas(){
    this.navCtrl.push('OcofechadasPage');

  }

  
  fecharOcorrencias(){
    this.navCtrl.push('OcoatendidasPage');

  }
  ocorrenciasRegiao(){

    this.handleRegioes();
  }
  handleRegioes() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Inserido',
      message: 'Relatorio Inserido  com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Centro',
          handler: () => {
            this.regiao="Centro"
          }
        },
        {
          text: 'Leste',
          handler: () => {
            this.regiao="Leste"
          }
        },
        {
          text: 'Oeste',
          handler: () => {
            this.regiao="Oeste"
          }
        },
        {
          text: 'Norte',
          handler: () => {
            this.regiao="Norte"
          }
        },
        {
          text: 'Sul',
          handler: () => {
            this.regiao="Sul"
          }
        },
        
        {
          text: 'Sudeste',
          handler: () => {
            this.regiao="Sudeste"
          }
        }
      ]
    });
    alert.present();
  }

}
