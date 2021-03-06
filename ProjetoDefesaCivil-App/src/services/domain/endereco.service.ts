import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

import { API_CONFIG } from "../../config/api.config";
import { EnderecoDTO } from "../../models/endereco.dto";


@Injectable()
export class EnderecoService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEnderecoId(endereco_id: string) : Observable<EnderecoDTO[]> {

        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.herokuBaseUrl}/endereco/${endereco_id}`);
    }

    findByEnderecoRuaNome(rua_nome: string) : Observable<EnderecoDTO[]> {

        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.herokuBaseUrl}/endereco/ruanome/${rua_nome}`);
    }

    findByEnderecoRuaBairro(bairro_nome: string) : Observable<EnderecoDTO[]> {

        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.herokuBaseUrl}/endereco/ruabairro/${bairro_nome}`);
    }

    findByEnderecoRuaCep(rua_cep: string) : Observable<EnderecoDTO[]> {

        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.herokuBaseUrl}/endereco/cep/${rua_cep}`);
    }

    findByEnderecoAll() : Observable<EnderecoDTO[]> {

        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.herokuBaseUrl}/endereco/todos`);
    }


    getRuaNome(rua:EnderecoDTO){

        return rua.nome;
    }
  
}