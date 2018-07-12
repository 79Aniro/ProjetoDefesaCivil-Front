import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencia.dto";
import { Observable } from "rxjs/Rx";
import{OcorrenciaNewDTO} from "../../models/ocorrenciaNew.dto"
import { FuncionarioService } from "./funcionario.service";


@Injectable()
export class OcorrenciaService{

    funcionarioService: FuncionarioService

    constructor(public http: HttpClient){


    }

    findOcoAbertas(): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/abertas`);

    }

    findOcoFechadas(): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/fechadas`);

    }

    findOcoAtendidas(): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/atendidas`);

    }

    fecharOco(id:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/fechar/${id}`);

    }

    ocoRegiao(regiao:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/regiao/${regiao}`);

    }
   


    insert(obj : OcorrenciaNewDTO) {
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/ocorrencias`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}