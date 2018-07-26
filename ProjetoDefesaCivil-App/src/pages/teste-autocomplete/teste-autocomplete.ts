import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecoService } from '../../services/domain/endereco.service';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-teste-autocomplete',
  templateUrl: 'teste-autocomplete.html',
})

export class TesteAutocompletePage {
  searchQuery: string = '';
  items: string[];
  formGroup: FormGroup;
  pais:string;
  ruas:EnderecoDTO[]
  ruasString:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public ruaService: EnderecoService,
    public auth: AuthService,
    public localStorage: StorageService
  ) {

    this.formGroup = this.formBuilder.group({
      item: ['', [Validators.required]],

    });

    this.initializeItems();

   
  }

  initializeItems() {
   /* this.ruaService.findByEnderecoAll().
    subscribe(response =>{
      this.ruas=response;
      
      
     
    },
    error => { });*/
    console.log("local");
    this.ruas=this.localStorage.getRuasDTO()
    

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    
    
    // set val to the value of the searchbar
    const val = ev.target.value;
   
    
    

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ruas = this.ruas.filter((rua) => {
        
        return (this.ruaService.getRuaNome(rua).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.initializeItems();
    }
   
    
   
  }

  send(item,itemNome){

    console.log(item,itemNome);
    
   
    this.auth.storage.setLocalRua(item);
    
    this.navCtrl.pop();
  
    
  }


  updateRuaAll() {

    this.ruaService.findByEnderecoAll()

      .subscribe(response => {
        this.ruas= response;
    
      },
        error => { });

  }
}



