import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IOcorrenciaPage } from './i-ocorrencia';

@NgModule({
  declarations: [
    IOcorrenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(IOcorrenciaPage),
  ],
})
export class IOcorrenciaPageModule {}
