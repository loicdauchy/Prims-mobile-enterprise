// variablesGlobales.ts
import { Injectable } from '@angular/core';
@Injectable()
export class VariablesGlobales {
    isLoggedIn:any = localStorage.getItem('user');
    commerceId:number = null;
    checkScann:boolean = false;
    commerces = [];
    checkUserInfos:boolean = false;
}