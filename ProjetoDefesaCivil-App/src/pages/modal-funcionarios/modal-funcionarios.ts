import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { FuncionarioService } from '../../services/domain/funcionario.service';
import { FuncionarioDTO } from '../../models/funcionario.dto';



@IonicPage()
@Component({
  selector: 'page-modal-funcionarios',
  templateUrl: 'modal-funcionarios.html',
})
export class ModalFuncionariosPage {

  list: FuncionarioDTO[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public service: FuncionarioService,
     public viewcrtl:ViewController) {
  }

  ionViewDidLoad() {
    
    this.buscarAgentes()
    .subscribe(response=>{

      this.list=response;
      console.log(this.list);
    })

  }

  buscarAgentes(){

    return this.service.findByPerfil();

  }

  enviarIdAgente(agente:string){

    console.log("id do agente",agente)
this.viewcrtl.dismiss(agente);

  }
  
}
