import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageStatusType } from '../../types/MessageStatusType';
import { GetAllItemsType } from '../../types/GetAllItemsType';
import { GetInputAndOutputForGraphicsType } from '../../types/GetInputAndOutputForGraphicsType';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlCreateItem = "http://localhost:3000/api/items/create";
  urlGetAllItems = "http://localhost:3000/api/items/get_all";
  urlUpdateItem = "http://localhost:3000/api/items/update";
  urlRemoveItem = "http://localhost:3000/api/items/destroy";
  urlGraphicInputAndOutputItem = "http://localhost:3000/api/items/graphics_by_input_and_output";

  constructor(
    private http: HttpClient
  ) { }

  createItemService(
    name: string,
    operation: string,
    price: number,
    userId: string | null,
    token: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    const body = {
      'name': name,
      'operation': operation,
      'price': price,
      'user': userId
    };

    return this.http.post<MessageStatusType>(this.urlCreateItem, body, httpOptions);
  }

  getAllItemsService(
    userId: string | null,
    token: string | null,
    monthActual: string
  ): Observable<GetAllItemsType | MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    switch (monthActual) {
      case 'Janeiro':
        monthActual = 'January';
        break;

      case 'Fevereiro':
        monthActual = 'February';
        break;

      case 'Março':
        monthActual = 'March';
        break;

      case 'Abril':
        monthActual = 'April';
        break;

      case 'Maio':
        monthActual = 'May';
        break;

      case 'Junho':
        monthActual = 'June';
        break;

      case 'Julho':
        monthActual = 'July';
        break;

      case 'Agosto':
        monthActual = 'August';
        break;

      case 'Setembro':
        monthActual = 'September';
        break;

      case 'Outubro':
        monthActual = 'October';
        break;

      case 'Novembro':
        monthActual = 'November';
        break;

      case 'Dezembro':
        monthActual = 'December';
        break;

      default:
      monthActual = "";
        break;
    }

    return this.http.get<GetAllItemsType | MessageStatusType>(this.urlGetAllItems + "/" + userId + "/" + monthActual, httpOptions);
  }

  updateItemService(
    itemId: string,
    name: string,
    operation: string,
    price: string,
    token: string | null
  ):Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    const body = {
      'name': name,
      'operation': operation,
      'price': price
    };

    return this.http.patch<MessageStatusType>(this.urlUpdateItem + "/"+ itemId,body,httpOptions);
  } 

  deleteItemService(itemId: string, token: string | null): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.delete<MessageStatusType>(this.urlRemoveItem + "/"+ itemId,httpOptions);
  }

  getGraphicsInputAndOutput(
    userId: string | null,
    token: string | null,
    startDate: Date | undefined,
    endDate: Date | undefined
  ): Observable<GetInputAndOutputForGraphicsType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    const body = {
      'start_date': startDate,
      'end_date': endDate  
    }

    return this.http.post<GetInputAndOutputForGraphicsType>(this.urlGraphicInputAndOutputItem + "/"+ userId,body,httpOptions)
    .pipe(
      catchError(err => {
        console.error('Erro ao buscar dados:', err);
        return throwError(() => new Error('Erro ao buscar dados do gráfico'));
      })
    );
  }
}