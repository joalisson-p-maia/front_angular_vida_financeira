import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetOneFinancialType } from '../../types/GetOneFinancialType';
import { MessageStatusType } from '../../types/MessageStatusType';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  urlCreateFinancial: string = "http://localhost:3000/api/financial/create";
  urlGetOneFinancial: string = "http://localhost:3000/api/financial/get_one";
  urlUpdateFinancial: string = "http://localhost:3000/api/financial/update";

  constructor(
    private readonly http: HttpClient
  ) { }

  getOneFinancialService(
    userId: string | null,
    token: string | null
  ):Observable<GetOneFinancialType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    console.log(userId);

    return this.http.get<GetOneFinancialType>(this.urlGetOneFinancial + "/" + userId,httpOptions);
  }

  createFinancialService(
    emergency_fund: number,
    variable_income: number,
    fixed_income: number,
    userId: string | null,
    token: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const body = {
      'emergency_fund': emergency_fund,
      'variable_income': variable_income,
      'fixed_income': fixed_income,
      'user': userId
    };

    return this.http.post<MessageStatusType>(this.urlCreateFinancial,body,httpOptions);
  }

  updateFinancialService(
    type: string,
    valueModal: number,
    totalValues: number,
    financialId: string, 
    userId: string | null,
    token: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    if(type === "Fundo de Emergência"){
      type = "emergency_fund";
    }else if(type === "Investimentos Fixos"){
      type = "fixed_income";
    }else if(type === "Investimentos Variáveis"){
      type = "variable_income";
    }else{
      type = "";
    }

    const body = {
      [type]: valueModal,
      'total': totalValues,
      'user': userId
    };

    return this.http.patch<MessageStatusType>(this.urlUpdateFinancial+ "/" + financialId,body,httpOptions);
  }
}
