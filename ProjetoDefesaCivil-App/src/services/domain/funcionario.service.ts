import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { FuncionarioDTO } from "../../models/funcionario.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class FuncionarioService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email: string) : Observable<FuncionarioDTO> {

        return this.http.get<FuncionarioDTO>(`${API_CONFIG.baseUrl}/funcionarios/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}

