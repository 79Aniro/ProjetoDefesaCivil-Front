import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

import { API_CONFIG } from "../../config/api.config";
import { RuaDTO } from "../../models/rua.dto";

@Injectable()
export class RuaService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByBairroId(bairro_id: string) : Observable<RuaDTO[]> {

        return this.http.get<RuaDTO[]>(`${API_CONFIG.baseUrl}/ruas/ruasbairro/${bairro_id}`);
    }

   
}