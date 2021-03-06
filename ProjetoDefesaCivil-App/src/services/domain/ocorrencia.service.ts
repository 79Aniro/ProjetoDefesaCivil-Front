import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencia.dto";
import { Observable } from "rxjs/Rx";
import{OcorrenciaNewDTO} from "../../models/ocorrenciaNew.dto"
import { FuncionarioService } from "./funcionario.service";
import { TipoOcorrenciaDTO } from "../../models/tipoOcorrencia.dto";
import { OrigemOcorrenciaDTO } from "../../models/origemOcorenciaDTO";
import { DepartamentoDTO } from "../../models/departamento.dto";
import { StorageService } from '../storage.service';


@Injectable()
export class OcorrenciaService{

    funcionarioService: FuncionarioService
    deps:Observable<DepartamentoDTO[]>
    dep:Observable<DepartamentoDTO>
    constructor(public http: HttpClient,
        public storage: StorageService){


    }

    findOcoAbertas(): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/abertas`);

    }


    findOcoAbertasPage(page : number = 0, linesPerPage : number = 4): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/abertas/page?page=${page}&linesPerPage=${linesPerPage}`);

    }


    findOcoFechadas(page : number = 0, linesPerPage : number = 4): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/fechadas/page?page=${page}&linesPerPage=${linesPerPage}`);

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

    ocoAgente(agente:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/agente?agente=${agente}`);

    }


      ocoRegiaoPage(regiao:string,page : number = 0, linesPerPage : number = 4): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/regiao/page?regiao=${regiao}&page=${page}&linesPerPage=${linesPerPage}`);

    }
    ocoDataAbertura(dataAbertura:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/dataAbertura/${dataAbertura}`);

    }

    ocoDataAtendimento(dataAtendimento:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/dataAtendimento/${dataAtendimento}`);

    }

    ocoDataFechamento(dataFechamento:string): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/dataFechamento/${dataFechamento}`);

    }

    tiposocorrenciaAll(): Observable<TipoOcorrenciaDTO[]>{

        return this.http.get<TipoOcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/tipoOcorrencia/tipos`);

    }

    origemOcorrenciaAll(): Observable<OrigemOcorrenciaDTO[]>{

        return this.http.get<OrigemOcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/origemOcorrencia/tipos`);

    }
    ocoDataAberturaBetween(dataStart:string,dataEnd:string,page : number = 0, linesPerPage : number = 4): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/dataAberturaBetween/${dataStart}/${dataEnd}?page=${page}&linesPerPage=${linesPerPage}`);

    }


    departamentos(): Observable<DepartamentoDTO[]>{

        return this.http.get<DepartamentoDTO[]>(`${API_CONFIG.herokuBaseUrl}/departamentos/dto`);

    }

    ocoAtendidasPage(regiao:string,page : number = 0, linesPerPage : number = 4): Observable<OcorrenciaDTO[]>{

        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.herokuBaseUrl}/ocorrencias/atendidas/page?&page=${page}&linesPerPage=${linesPerPage}`);

    }

    insert(obj : OcorrenciaNewDTO) {
        let tok=this.storage.getToken();
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/ocorrencias/nova`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text',
                headers:{
                    tok
                }
            }
        ); 
    }
}