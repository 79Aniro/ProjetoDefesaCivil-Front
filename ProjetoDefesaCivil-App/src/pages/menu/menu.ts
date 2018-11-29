import { Component } from '@angular/core';

import { NavController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { FormBuilder } from '@angular/forms';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  perfil_user: string;
  ruas:EnderecoDTO[];

  constructor(public navCtrl: NavController,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
  public endService:EnderecoService,
  public auth: AuthService ,
  public loadingCtrl: LoadingController) {


  }
  ionViewDidLoad() {


    if(this.localStorage.getLocalUser()==null){
     // this.auth.logout();
      this.navCtrl.setRoot('HomePage');
    }
    else{
      let varId = this.localStorage.getLocalUser();
      this.id_user = varId.iduser;
     
      this.funcionarioService.buscaPerfil(this.id_user).
        subscribe(response => {
          this.funcionarioDto = response;
          this.perfil_user = this.funcionarioDto.perfil;
          this.localStorage.setPerfil(this.perfil_user);
        },
          error => { });
  
        
        
         
  
    }
  }
  insereOco() {

    let loader= this.presentLoading();
    this.navCtrl.push('IOcorrenciaPage');
    loader.dismiss();
  }




  ocorrenciasPesquisas() {

    this.navCtrl.push('MenuOcorrenciaPage');

  }

  menuRelatorio() {

    this.navCtrl.push('MenuRelatorioPage');

  }

  signup() {
    this.navCtrl.push('NovoFuncionarioPage');
  }

  buscaPerfil(id: string) {

    return this.funcionarioService.buscaPerfil(id);
  }

  mudarSenha(){
    this.navCtrl.push('MudarSenhaPage');
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration:5000
      
    });
    loader.present();
    return loader;
  }

}


