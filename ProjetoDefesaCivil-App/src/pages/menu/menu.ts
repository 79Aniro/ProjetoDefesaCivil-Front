import { Component } from '@angular/core';

import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { FormBuilder } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  id_user: string;
  funcionarioDto: FuncionarioDTO;
  constructor(public navCtrl: NavController,
    public storage: StorageService,
    public funcionarioService: FuncionarioService,
    public localStorage: StorageService,
    public formBuilder: FormBuilder,
   
    public navParams: NavParams,) {
      

  }
  ionViewDidLoad() {
   
        
      
        let varId = this.localStorage.getLocalUser();
        this.id_user=varId.iduser;       

        
  }
  insereOco(){

    this.navCtrl.push('IOcorrenciaPage');
  
  }

  insereRelatorio(){

    this.navCtrl.push('IRelatorioPage');
  
  }

  teste(){

    this.navCtrl.push('TesteAutocompletePage');
  
  }

  ocorrenciasPesquisas(){

    this.navCtrl.push('MenuOcorrenciaPage');
  
  }

 menuRelatorio(){

    this.navCtrl.push('MenuRelatorioPage');
  
  }

  signup() {
    this.navCtrl.push('NovoFuncionarioPage');
  }

}


