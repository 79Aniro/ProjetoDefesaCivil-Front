import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { RuaDTO } from "../models/rua.dto";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    setLocalRua(obj:RuaDTO){

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.ruaDTO);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.ruaDTO, JSON.stringify(obj));
        }
       
    }

    getRuaDTO() : RuaDTO {
        let rua = localStorage.getItem(STORAGE_KEYS.ruaDTO);
        if (rua == null) {
            return null;
        }
        else {
            return JSON.parse(rua);
        }
    }
}