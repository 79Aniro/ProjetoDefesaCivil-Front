import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IOcorrenciaPage } from './i-ocorrencia';

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
    
  ]
})
export class IOcorrenciaPageModule {}
