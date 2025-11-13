import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageStatusType } from '../../types/MessageStatusType';
import { GetAllGoalsType } from '../../types/GetAllGoalsType';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  urlCreateGoals = "http://localhost:3000/api/goals/create";
  urlGetAllGoals = "http://localhost:3000/api/goals/get_all";
  urlUpdateGoals = "http://localhost:3000/api/goals/update";
  urlDeleteGoals = "http://localhost:3000/api/goals/destroy";

  constructor(
    private http: HttpClient
  ) { }

  createGoalsService(
    title: string,
    token: string | null,
    userId: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    const status = "nenhum";
    const number_status = 0;
    
    const body = {
      'title': title,
      'user': userId,
      'status': status,
      'number_status': number_status
    };
  
    return this.http.post<MessageStatusType>(this.urlCreateGoals, body, httpOptions);
  }

  getAllGoalsService(userId: string | null,token: string | null): Observable<GetAllGoalsType | MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    
    return this.http.get<GetAllGoalsType | MessageStatusType>(this.urlGetAllGoals+ "/" + userId, httpOptions);
  }

  updateStepsGoalsService(
    status: string,
    number_status: number,
    token: string | null,
    userId: string | null,
    goalsId: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    
    const body = {
      'user': userId,
      'status': status,
      'number_status': number_status
    };
  
    return this.http.patch<MessageStatusType>(this.urlUpdateGoals+ "/" + goalsId, body, httpOptions);
  }

  updateTitleGoalsService(
    title: string,
    userId: string | null,
    goalsId: string | null,
    token: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    
    const body = {
      'title': title,
      'user': userId
    };
  
    return this.http.patch<MessageStatusType>(this.urlUpdateGoals+ "/" + goalsId, body, httpOptions);
  }

  removeGoalsService( goalsId: string | null,token: string | null){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
        })
      }
    
      return this.http.delete<MessageStatusType>(this.urlDeleteGoals+ "/" + goalsId, httpOptions);
  }
}
