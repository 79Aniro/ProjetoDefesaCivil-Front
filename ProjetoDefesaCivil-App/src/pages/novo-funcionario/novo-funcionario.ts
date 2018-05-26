import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';




@IonicPage()
@Component({
  selector: 'page-novo-funcionario',
  templateUrl: 'novo-funcionario.html',
})
export class NovoFuncionarioPage {

  formGroup: FormGroup
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder:FormBuilder)  {

      this.formGroup=this.formBuilder.group({
        nome:['',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        email:['',[Validators.required,Validators.email]],
        senha:['',[Validators.required]],
        tipo:['',[Validators.required]]

      });
  }

  funcionarioUser() {
    console.log("enviou o form");
  }

}


