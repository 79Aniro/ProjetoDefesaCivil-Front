import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OcorrenciaService } from '../services/domain/ocorrencia.service';
import { RelatorioService } from '../services/domain/relatorio.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { FuncionarioService } from '../services/domain/funcionario.service';


@NgModule({
  declarations: [
    MyApp,
    

   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OcorrenciaService,
    RelatorioService,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    FuncionarioService
  ]
})
export class AppModule {}
