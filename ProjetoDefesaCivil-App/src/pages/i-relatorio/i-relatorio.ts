

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { StorageService } from '../../services/storage.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';



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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
    public ruaService: EnderecoService,
    public localStorage: StorageService,
    public alertCrtl: AlertController) {

    this.formGroup = this.formBuilder.group({
      rua: ['', [Validators.required]],
      ruaSol: ['', [Validators.required]],
      numeroLocal: ['', [Validators.required]],
      vistoria: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      funcionario: ['', [Validators.required]],
      ocorrencia: ['', [Validators.required]]

    });



  }

  ionViewDidLoad() {

    let ocorrenciaId = this.navParams.get('ocorrencia_id');
    this.oco_id = ocorrenciaId;
    this.formGroup.controls.ocorrencia.setValue(this.oco_id);

    let varId = this.localStorage.getLocalUser();
    this.id_user = varId.iduser;

    this.formGroup.controls.funcionario.setValue(this.id_user);

   
    this.presentModal();

   
  }


  insereRelatorio() {
    this.relatorioService.insert(this.formGroup.value)
      .subscribe(response => {

      this.handleRelatorioInserido();
      },
        error => { });
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




  




  presentModal() {
  
    this.navCtrl.push('TesteAutocompletePage');
    
  }

  insereRuaSol(){

    let varRua =this.localStorage.getRuaDTO();   
    
    this.formGroup.controls.ruaSol.setValue(varRua.nome);
    this.formGroup.controls.rua.setValue(varRua.id);
    
  }

}