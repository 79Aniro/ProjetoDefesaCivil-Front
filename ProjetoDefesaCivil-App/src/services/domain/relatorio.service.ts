import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RelatorioDTO } from "../../models/relatorio.dto";
import { Observable } from "rxjs/Rx";
import { RelatorioNewDTO } from "../../models/relatorioNew.dto";
import { ImageUtilService } from "../image-util.service";






@Injectable()
export class RelatorioService{

    rel: Observable<RelatorioDTO[]>;
    arr:Observable<Blob>;
    constructor(public http: HttpClient,
        public imageUtilService: ImageUtilService){


    }

    findRelatorios(): Observable<RelatorioDTO[]>{

        return this.http.get<RelatorioDTO[]>(`${API_CONFIG.herokuBaseUrl}/relatorios`);

    }

    insert(obj : RelatorioNewDTO) {
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/relatorios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    buscaoRelatoriosIdOco(id_ocorrencia : String) {
        
            return this.http.get<RelatorioDTO[]>(`${API_CONFIG.herokuBaseUrl}/relatorios/ocorrencia/${id_ocorrencia}`);
    }

    gerarPdfRelatorio(id_relarorio : String) {
        
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/relatorios/gerandoRelatorio/${id_relarorio}`,
        
    {
        observe: 'response', 
        responseType: 'text'
    });
}



    buscaoRelatoriosFunc(id_funcionario : String) {
        
        return this.http.get<RelatorioDTO[]>(`${API_CONFIG.herokuBaseUrl}/relatorios/idfuncionario/${id_funcionario}`);
}

    uploadPicture(picture, id_relatorio) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/relatorios/picture/${id_relatorio}`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}