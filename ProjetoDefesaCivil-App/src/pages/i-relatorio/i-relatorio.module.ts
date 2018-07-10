import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IRelatorioPage } from './i-relatorio';

import { Camera } from '@ionic-native/camera';
import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';
import { EnderecoService } from '../../services/domain/endereco.service';

@NgModule({
  declarations: [
    IRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(IRelatorioPage),
  ],

  providers:[
  
   
    Camera,
    EnderecoService,
    TesteAutocompletePage
  ]
})
export class IRelatorioPageModule {}
