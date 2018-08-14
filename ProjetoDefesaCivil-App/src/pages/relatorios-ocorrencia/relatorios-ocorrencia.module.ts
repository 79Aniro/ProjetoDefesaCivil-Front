import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { RelatoriosOcorrenciaPage } from './relatorios-ocorrencia';
import { RelatorioPdfPage } from '../relatorio-pdf/relatorio-pdf';

@NgModule({
  declarations: [
    RelatoriosOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatoriosOcorrenciaPage),
  ],

  providers:[
    RelatorioPdfPage
  ]
})
export class RelatoriosOcorrenciaPageModule {}
