import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { EnderecoDTO } from "../models/endereco.dto";
import { TipoOcorrenciaDTO } from "../models/tipoOcorrencia.dto";
import { OrigemOcorrenciaDTO } from '../models/origemOcorenciaDTO';
import { DepartamentoDTO } from "../models/departamento.dto";


@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    setLocalRua(obj: EnderecoDTO) {

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.endeDTO);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.endeDTO, JSON.stringify(obj));
        }

    }

    setLocalEnderecos(obj: EnderecoDTO[]) {

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.endDTO);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.endDTO, JSON.stringify(obj));
        }

    }

    getRuaDTO(): EnderecoDTO {
        let rua = localStorage.getItem(STORAGE_KEYS.endeDTO);
        if (rua == null) {
            return null;
        }
        else {
            return JSON.parse(rua);
        }
    }

    getRuasDTO(): EnderecoDTO[] {
        let ruas = localStorage.getItem(STORAGE_KEYS.endDTO);
        if (ruas == null) {
            return null;
        }
        else {
            return JSON.parse(ruas);
        }
    }

    verificaRuas():boolean{
        let ruas = localStorage.getItem(STORAGE_KEYS.endDTO);
        if (ruas == null) {
            return false;
        }
        else {
            return true
        }
    }

    setPerfil(perfil: string) {
        localStorage.setItem(STORAGE_KEYS.perfil, perfil);
    }
    getPerfil() {
        return localStorage.getItem(STORAGE_KEYS.perfil);
    }

setTipoOcorrencia(obj:TipoOcorrenciaDTO[]){

    if (obj == null) {
        localStorage.removeItem(STORAGE_KEYS.tipoOcorrencia);
    }
    else {
        localStorage.setItem(STORAGE_KEYS.tipoOcorrencia, JSON.stringify(obj));
    }
}

getTipoOcorrencia(){
    let tipos= localStorage.getItem(STORAGE_KEYS.tipoOcorrencia);
    return JSON.parse(tipos);
}


setOrigemOcorrencia(obj:OrigemOcorrenciaDTO[]){
    if (obj == null) {
        localStorage.removeItem(STORAGE_KEYS.origemOcorrencia);
    }
    else {
        localStorage.setItem(STORAGE_KEYS.origemOcorrencia, JSON.stringify(obj));
    }

}

getOrigemOcorrencia(){
    let origem=localStorage.getItem(STORAGE_KEYS.origemOcorrencia);
    return JSON.parse(origem);
}




setDeparatementos(obj:DepartamentoDTO[]){
    if (obj == null) {
        localStorage.removeItem(STORAGE_KEYS.departamentos);
    }
    else {
        localStorage.setItem(STORAGE_KEYS.departamentos, JSON.stringify(obj));
    }

}

getDepartamentos(){
    let departamentos= localStorage.getItem(STORAGE_KEYS.departamentos);
    return JSON.parse(departamentos);
}

setToken(token:string){
    if(token==''){
        localStorage.removeItem(STORAGE_KEYS.token);
    }
    else{
        localStorage.setItem(STORAGE_KEYS.token,token);
    }
}

getToken(){
    return localStorage.getItem(STORAGE_KEYS.token);
}

}