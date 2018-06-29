import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
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
     public localStorage: StorageService,) {
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

  if(this.perfil_user== "2")   {
    console.log(this.perfil_user);
    this.relatorioService.findRelatorios()
    .subscribe(response =>{
      this.items=response;
      this.buscaUrl();
      
     
    },
    error => { });
   }
   else{
    console.log("nao");
    this.relatorioService.buscaoRelatoriosFunc()
    .subscribe(response =>{
      this.items=response;
      this.buscaUrl();
      
     
    },
    error => { });
   }
}
 

  buscaUrl(): string{

    this.url = `${API_CONFIG.bucketBaseUrl}`
    return this.url;
  }

 
}
