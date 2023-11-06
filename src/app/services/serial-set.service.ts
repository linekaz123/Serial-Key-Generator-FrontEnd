import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerialSetRequest } from '../models/serial-set-request';
import { SerialSetResponse } from '../models/serial-set-response';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SerialSetService {

  private baseUrl: string = `${environment.apiUrl}/api/serialsets`;

  constructor(private http: HttpClient) {}

  createSerialSet(serialSetRequest: SerialSetRequest): Observable<SerialSetResponse> {
    return this.http.post<SerialSetResponse>(`${this.baseUrl}/create`, serialSetRequest);
  }

  getAllSerialSets(): Observable<SerialSetResponse[]> {
    return this.http.get<SerialSetResponse[]>(`${this.baseUrl}/all`);
  }

  getSerialSetByName(name: string): Observable<SerialSetResponse> {
    return this.http.get<SerialSetResponse>(`${this.baseUrl}/${name}`);
  }

  deleteSerialSetByName(name: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${name}`);
  }

  exportSerialNumbersToCSV(serialSetName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/export/${serialSetName}`);
  }
}
