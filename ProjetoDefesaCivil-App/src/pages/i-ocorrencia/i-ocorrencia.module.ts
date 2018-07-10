import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IOcorrenciaPage } from './i-ocorrencia';


import { TesteAutocompletePage } from '../teste-autocomplete/teste-autocomplete';
import { EnderecoService } from '../../services/domain/endereco.service';

@NgModule({
  declarations: [
    IOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(IOcorrenciaPage),
    
  ],
  providers:[
    
    EnderecoService,
    TesteAutocompletePage
  ]
})
export class IOcorrenciaPageModule {}
