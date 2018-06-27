import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TesteAutocompletePage } from './teste-autocomplete';
import { RuaService } from '../../services/domain/rua.service';

@NgModule({
  declarations: [
    TesteAutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(TesteAutocompletePage),
  ],
providers:[
  RuaService
]
})
export class TesteAutocompletePageModule {}
