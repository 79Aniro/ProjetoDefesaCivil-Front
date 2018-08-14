import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { FuncionarioDTO } from "../../models/funcionario.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class FuncionarioService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email: string) : Observable<FuncionarioDTO> {

        return this.http.get<FuncionarioDTO>(`${API_CONFIG.herokuBaseUrl}/funcionarios/email?value=${email}`);
    }

    

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : FuncionarioDTO) {
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/funcionarios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    buscaPerfil(id:string) {
        return this.http.get<FuncionarioDTO> (`${API_CONFIG.herokuBaseUrl}/funcionarios/perfil/${id}`);
    }
}