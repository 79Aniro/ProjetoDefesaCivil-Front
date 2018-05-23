import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RelatorioDTO } from "../../models/relatorio.dto";
import { Observable } from "rxjs/Rx";






@Injectable()
export class RelatorioService{

    constructor(public http: HttpClient){


    }

    findRelatorios(): Observable<RelatorioDTO[]>{

        return this.http.get<RelatorioDTO[]>(`${API_CONFIG.baseUrl}/relatorios`);

    }
}