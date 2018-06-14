import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

import { FuncionarioService } from '../../services/domain/funcionario.service';




@IonicPage()
@Component({
  selector: 'page-novo-funcionario',
  templateUrl: 'novo-funcionario.html',
})
export class NovoFuncionarioPage {

  formGroup: FormGroup
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder:FormBuilder,
     public alertCrtl: AlertController,
    public funcionarioService:FuncionarioService)  {

      this.formGroup=this.formBuilder.group({
        nome:['',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        email:['',[Validators.required,Validators.email]],
        senha:['',[Validators.required]],
        tipo:['',[Validators.required]]

      });
  }

  funcionarioUser() {
    console.log("enviou o form");
    this.funcionarioService.insert(this.formGroup.value)
     .subscribe(response => {
        this.showInsert();
      },
     error => {});
  }

  showInsert() {
    let alert = this.alertCrtl.create({
      title: 'Funcionario Inserido',
      message: 'Funcionario inserido com sucesso',
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


