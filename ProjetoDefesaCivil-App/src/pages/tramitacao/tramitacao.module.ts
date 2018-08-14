import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { TramitacaoPage } from './tramitacao';

@NgModule({
  declarations: [
    TramitacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TramitacaoPage),
  ],
})
export class TramitacaoPageModule {}
