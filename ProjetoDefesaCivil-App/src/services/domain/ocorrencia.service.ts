import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencia.dto";
import { Observable } from "rxjs/Rx";
import{OcorrenciaNewDTO} from "../../models/ocorrenciaNew.dto"

import { FuncionarioService } from "./funcionario.service";
import { FuncionarioDTO } from "../../models/funcionario.dto";

@Injectable()
export class OcorrenciaService{

    funcionarioService: FuncionarioService

    constructor(public http: HttpClient){


    }

    findOcoAbertas(): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/abertas`);

    }

   


    insert(obj : OcorrenciaNewDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/ocorrencias`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}