import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFuncionariosPage } from './modal-funcionarios';

@NgModule({
  declarations: [
    ModalFuncionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFuncionariosPage),
  ],
})
export class ModalFuncionariosPageModule {}
