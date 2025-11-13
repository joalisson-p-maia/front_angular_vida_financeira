import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  urlCreateReports: string = "http://localhost:3000/api/pdf/generate";
  urlCsvOrExcel: string = "http://localhost:3000/api/exports_csv_excel/exports_item";
  urlSearchData: string = "http://localhost:3000/api/items/search_data";

  constructor(private readonly http: HttpClient) { }

  generatePdfService(
    startDate: Date | undefined,
    endDate: Date | undefined,
    userId: string | null,
    token: string | null
  ): Observable<Blob>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      }),
      responseType: 'blob' as 'json',
    };

    const body = {
      'startDate': startDate,
      'endDate': endDate
    };

    return this.http.post<Blob>(this.urlCreateReports+ "/" + userId,body,httpOptions);
  }

  generateCsvOrExcelService(
    startDate: Date | undefined,
    endDate: Date | undefined,
    typeCsvOrExcel: string,
    userId: string | null,
    token: string | null
  ): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'blob' as 'json'
    };

    const body = {
      startDate: startDate,
      endDate: endDate,
      typeCsvOrExcel: typeCsvOrExcel,
    };

    return this.http.post<Blob>(`${this.urlCsvOrExcel}/${userId}`, body, httpOptions);
  }

  searchDataService(
    startDate: Date | undefined,
    endDate: Date | undefined,
    operation: string,
    userId: string | null,
    token: string | null
  ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      })
    };

    const body = {
      startDate: startDate,
      endDate: endDate,
      operation: operation
    };

    return this.http.post(this.urlSearchData+"/"+userId,body,httpOptions);
  }
}
