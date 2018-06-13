import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RelatorioDTO } from "../../models/relatorio.dto";
import { Observable } from "rxjs/Rx";
import { RelatorioNewDTO } from "../../models/relatorioNew.dto";






@Injectable()
export class RelatorioService{

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

    getSmallImageFromBucket(id : string,n:string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/relatorio${id}-${n}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }

}