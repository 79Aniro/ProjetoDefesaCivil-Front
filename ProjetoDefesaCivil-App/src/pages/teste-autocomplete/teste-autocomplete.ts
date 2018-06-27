import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuaService } from '../../services/domain/rua.service';
import { RuaDTO } from '../../models/rua.dto';
import { AuthService } from '../../services/auth.service';



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
  ruas:RuaDTO[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,public ruaService: RuaService,
    public auth: AuthService) {

    this.formGroup = this.formBuilder.group({
      item: ['', [Validators.required]],

    });

    this.initializeItems();

   
  }

  initializeItems() {
    this.ruaService.findByRuaAll().
    subscribe(response =>{
      this.ruas=response;
      
      
     
    },
    error => { });
    

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

    this.ruaService.findByRuaAll()

      .subscribe(response => {
        this.ruas= response;
    
      },
        error => { });

  }
}



