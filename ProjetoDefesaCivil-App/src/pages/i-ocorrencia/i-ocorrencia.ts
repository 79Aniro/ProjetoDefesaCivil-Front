import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';



@IonicPage()
@Component({
  selector: 'page-i-ocorrencia',
  templateUrl: 'i-ocorrencia.html',
})
export class IOcorrenciaPage {

  formGroup: FormGroup
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder:FormBuilder,
     public ocorrenciaService: OcorrenciaService)  {

      this.formGroup=this.formBuilder.group({  
        origemOcorrencia:['',[Validators.required]], 
        tipoOcorrencia:['',[Validators.required]], 
        regiao:['',[Validators.required]], 
        bairro:['',[Validators.required]], 
        ruaLocal:['',[Validators.required]], 
        numeroLocal:['',[Validators.required]], 
        historicoInicial:['',[Validators.required]], 
        tipoSolicitante:['',[Validators.required]], 
        ruaSolicitante:['',[Validators.required]],              
        nomeSolicitante:['',[Validators.required]],
        emailSolicitante:['',[Validators.required]],
        numeroResidenciaSolicitante:['',[Validators.required]],
        telefoneSolicitante:['',[Validators.required]],
        telefoneSolicitante2:['',[Validators.required]],
        funcionario:['1']

      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IOcorrenciaPage');
  }

  insereOco() {
    this.ocorrenciaService.insert(this.formGroup.value)
      .subscribe(response => {
       console.log("gravou")
      },
      error => {});
  }

}
