import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { EnderecoDTO } from "../models/endereco.dto";
import { TipoOcorrenciaDTO } from "../models/tipoOcorrencia.dto";


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

}