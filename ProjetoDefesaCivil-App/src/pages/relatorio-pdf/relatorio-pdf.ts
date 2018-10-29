import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import { RelatorioService } from '../../services/domain/relatorio.service';
import { RelatorioDTO } from '../../models/relatorio.dto';
import { Platform } from 'ionic-angular/platform/platform';
import { FileOpener } from '@ionic-native/file-opener';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-relatorio-pdf',
  templateUrl: 'relatorio-pdf.html',
})
export class RelatorioPdfPage {
  items: RelatorioDTO;
  img = new Image;
  urlFotos: string[];
  myIcon: string = "home";
  tramitacao: string;
  tramitacaoCod: string;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  cabecalho = {
    sigla: "COMDEC",
    secretaria: 'COORDENADORIA MUNICIPAL DE DEFESA CIVL',
    cidade: "SÃO JOSÉ DOS CAMPOS",
    rel: "R.O- Relatorio de Ocorrência"

  }
  pdfObj = null;
  body = [];
  myDate = new Date().toLocaleDateString();
  hora = new Date().toTimeString().substr(0, 8);
  dia = new Date().getDay();
  mes = new Date().getMonth.toString();

  id_relatorio: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  url: string;
  urlLogo: string;
  teste:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public relatorioService: RelatorioService,
    private file: File,
    private plt: Platform,
    private fileOpener: FileOpener) {
this.teste= "data:image/jpeg;base64,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"
  }

  ionViewDidLoad() {
    this.id_relatorio = this.navParams.get('id_relatorio');
    this.relatorioService.buscaoRelatoriosIdRel(this.id_relatorio)
      .subscribe(response => {
        this.items = response;


        this.relatorioService.buscaoUrlsFoto(this.id_relatorio).
          subscribe(response => {
            this.urlFotos = response;
            this.img1 = 'data:image/jpeg;base64,' + this.urlFotos[0]
            this.img2 = 'data:image/jpeg;base64,' + this.urlFotos[1];
            this.img3 = 'data:image/jpeg;base64,' + this.urlFotos[2];
            this.img4 = 'data:image/jpeg;base64,' + this.urlFotos[3];
            this.urlLogo = this.teste;
            

          });






      },
        error => { });

  }

  createPdf() {
    if (this.urlFotos.length == 0) {
      var docDefinition0 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [

          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },





          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },

          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },


          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          },

        }
      }
    }
else if(this.urlFotos.length==1){
      var docDefinition1 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*',],

              body: [

                [{ image: this.img1, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          },

        }
      }
	
    }
    else
    if(this.urlFotos.length==2){
      var docDefinition2 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*'],

              body: [

                [{ image: this.img1, width: 120 }, { image: this.img2, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          },

        }
      }
    }
 
   

    else if(this.urlFotos.length == 3){
      var docDefinition3 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*',],

              body: [

                [{ image: this.img1, width: 130 }, { image: this.img2, width: 130 }, { image: this.img3, width: 130 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          },

        }
      }
    }



    else {
      var docDefinition4 = {

        footer: function (currentPage, pageCount) { return { text: 'Rua Saigiro Nakamura, 10- Vila Industrial-São José dos Campos-São Paulo\nCEP:12220-280-Fone/Fax:(012)3913-2926 EMERGENCIA 190- COI', style: 'story', alignment: 'center' } },

        content: [
          {
            table: {

              headerRows: 1,
              widths: [100, 300, 100],

              body:[
                [{ image: this.urlLogo, width: 100, alignment: 'left' },{ text: 'COMDEC\nCOORDENADORIA MUNICIPAL DE DEFESA CIVIL\nSÃO JOSÉ DOS CAMPOS\nR.O- Relatorio de Ocorrência', style: 'header', alignment: 'center' },{ image: this.urlLogo, width: 100, alignment: 'left' },]
              ]
            }
          },
          { text: 'Relatorio nº ' + this.items.id + '/' + this.items.ano, style: 'subheader' },
          { text: this.letterObj.from },

          { text: 'Origem da Ocorrência:  ' + this.items.origemOcorrencia, style: 'subheader' },
          this.letterObj.to,

          { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },


          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*'],

              body: [

                [{ text: "Data " + this.myDate, bold: true }, { text: "Horario " + this.hora, bold: true }, { text: "Relatorio  " + this.id_relatorio + "/2018", bold: true }],

              ]
            }


            
          },

          
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Solicitante " + this.items.solicitante }, { text: "Telefone  " + this.items.telefone, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [350, '*'],

              body: [

                [{ text: "Local da Ocorrencia: \n" + this.items.rua + " Bairro: " + this.items.bairro }, { text: "Numero " + this.items.numeroLocal, bold: true }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Historico Inicial: \n" + this.items.historicoInicial }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*', '*'],

              body: [

                [{ image: this.img1, width: 120 }, { image: this.img2, width: 120 }, { image: this.img3, width: 120 }, { image: this.img4, width: 120 }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Vistoria: \n" + this.items.vistoria }],

              ]
            }
          },
          {
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*'],

              body: [

                [{ text: "Observação: \n" + this.items.observacao }],

              ]
            }
          },
          { text: '\nTramitacao:  ' + this.items.tramitacao_descricao, style: 'footer' },

          { text: 'Concluido por :  \n', style: 'subheader' },




        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          },
          footer: {
            italic: true,
            width: '50%',
            fontSize: 10,

          },

        }
      }
    }


    if (this.urlFotos.length == 0) {
      this.pdfObj = pdfMake.createPdf(docDefinition0);
    }
    else if(this.urlFotos.length==1){
      this.pdfObj = pdfMake.createPdf(docDefinition1);
    }
    else if(this.urlFotos.length==2){
      this.pdfObj = pdfMake.createPdf(docDefinition2);
    }
    else if(this.urlFotos.length==3){
      this.pdfObj = pdfMake.createPdf(docDefinition3);
    }
    else {
      this.pdfObj = pdfMake.createPdf(docDefinition4);
    }


  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'Relatorio nº ' + this.items.id + '/' + this.items.ano, blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'Relatorio nº ' + this.items.id + '/' + this.items.ano, 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }



  updateTramitacao() {



  }



}













