import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

import { API_CONFIG } from "../../config/api.config";
import { BairroDTO } from "../../models/bairro.dto";

@Injectable()
export class BairroService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByRegiaoId(regiao_id: string) : Observable<BairroDTO[]> {

        return this.http.get<BairroDTO[]>(`${API_CONFIG.baseUrl}/defesabairros/bairrosregiao/${regiao_id}`);
    }

   
}