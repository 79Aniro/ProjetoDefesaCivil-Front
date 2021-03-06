import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import {JwtHelper}from 'angular2-jwt'
import { EnderecoDTO } from "../models/endereco.dto";

@Injectable()
export class AuthService {

    jwtHelper:JwtHelper =new JwtHelper();
   
    constructor(public http: HttpClient, public storage: StorageService) {
    }
    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.herokuBaseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
    refreshToken() {
                return this.http.post(
                    `${API_CONFIG.herokuBaseUrl}/auth/refresh_token`, 
                    {},
                    {
                        observe: 'response',
                        responseType: 'text'
                    });
            }

    successfulLogin(authorizationValue : string, iduserValue:string) {
        let tok = authorizationValue.substring(7);
     
        let user : LocalUser = {
            token: tok,
            email:this.jwtHelper.decodeToken(tok).sub,
            iduser:iduserValue
            
        };
        
        this.storage.setLocalUser(user);
    }
    logout() {
        this.storage.setLocalUser(null);
        this.storage.setPerfil(null);
    }
}