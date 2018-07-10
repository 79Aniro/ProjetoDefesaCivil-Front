import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TesteAutocompletePage } from './teste-autocomplete';
import { EnderecoService } from '../../services/domain/endereco.service';


@NgModule({
  declarations: [
    TesteAutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(TesteAutocompletePage),
  ],
providers:[
  EnderecoService
]
})
export class TesteAutocompletePageModule {}
