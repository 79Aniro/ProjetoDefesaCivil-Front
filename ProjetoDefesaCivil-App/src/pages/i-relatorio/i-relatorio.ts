

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { StorageService } from '../../services/storage.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';
import { AuthService } from '../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-i-relatorio',
  templateUrl: 'i-relatorio.html',
})
export class IRelatorioPage {

  formGroup: FormGroup;
  ruas: EnderecoDTO[];
  id_user: string;
  oco_id: string;
  agente:string;

  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
    public ruaService: EnderecoService,
    public localStorage: StorageService,
    public alertCrtl: AlertController,
    public auth: AuthService) {

    this.formGroup = this.formBuilder.group({
      endereco: ['', [Validators.required]],        
      vistoria: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      ocorrencia: ['', [Validators.required]]
    });

  }

  ionViewDidLoad() {

    let ocorrenciaId = this.navParams.get('ocorrencia_id');
    this.oco_id = ocorrenciaId;
    let agenteV=this.navParams.get('agente');
    this.agente=agenteV;
    
    this.formGroup.controls.ocorrencia.setValue(this.oco_id);
    if(this.localStorage.getLocalUser()==null){
      this.auth.logout();
      this.navCtrl.setRoot('MenuOcorrenciaPage');
    }
    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;

   
    this.formGroup.controls.funcionario.setValue(this.agente);

  
  

   
  }


  insereRelatorio() {
  let x=this.formGroup.value;
  
    this.relatorioService.insert(this.formGroup.value)
      .subscribe(response => {

      this.handleRelatorioInserido();
      },
        error => {
          this.handleRelatorioNaoInserido();
         });
  }

  updateRuaAll() {

    this.ruaService.findByEnderecoAll()

      .subscribe(response => {
        this.ruas = response;
        
      },
        error => { });

  }

 
  handleRelatorioInserido() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Inserido',
      message: 'Relatorio Inserido  com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('MenuPage');
          }
        }
      ]
    });
    alert.present();
  }



  handleRelatorioNaoInserido() {
    let alert = this.alertCrtl.create({
      title: 'Relatorio Não Inserido',
      message: 'Relatorio Não Foi inserido',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
         
          handler: () => {
            this.navCtrl.setRoot('MenuPage');
          }
        }
      ],
      cssClass: 'alertDanger'
    });
    alert.present();
    
  }
  


 
  insereRuaSol(){

    let varRua =this.localStorage.getRuaDTO();   
    
    this.formGroup.controls.ruaSol.setValue(varRua.nome);
    this.formGroup.controls.endereco.setValue(varRua.id);
    
  }

}