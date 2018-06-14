import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RelatorioDTO } from "../../models/relatorio.dto";
import { Observable } from "rxjs/Rx";
import { RelatorioNewDTO } from "../../models/relatorioNew.dto";






@Injectable()
export class RelatorioService{

    rel: Observable<RelatorioDTO[]>;
    arr:Observable<Blob>;
    constructor(public http: HttpClient){


    }

    findRelatorios(): Observable<RelatorioDTO[]>{

        return this.http.get<RelatorioDTO[]>(`${API_CONFIG.baseUrl}/relatorios`);

    }

    insert(obj : RelatorioNewDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/relatorios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

  

}