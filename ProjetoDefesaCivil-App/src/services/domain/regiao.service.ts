import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

import { API_CONFIG } from "../../config/api.config";
import { RegiaoDTO } from "../../models/regiao.dto";


@Injectable()
export class RegiaoService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail() : Observable<RegiaoDTO> {

        return this.http.get<RegiaoDTO>(`${API_CONFIG.baseUrl}/regiao`);
    }

   
}