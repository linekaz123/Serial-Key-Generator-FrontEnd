import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SerialSet } from '../models/SerialSet/serial-set';

@Injectable({
  providedIn: 'root',
})
export class SerialSetService {
  private apiUrl: string = `${environment.apiUrl}/api/serialsets`;

  constructor(private http: HttpClient) {}

  createSerialSet(serialSet: SerialSet): Observable<SerialSet> {
    return this.http.post<SerialSet>(`${this.apiUrl}/create`, serialSet);
  }

  getAllSerialSets(): Observable<SerialSet[]> {
    return this.http.get<SerialSet[]>(`${this.apiUrl}/all`);
  }

  getSerialSetById(id: number): Observable<SerialSet> {
    return this.http.get<SerialSet>(`${this.apiUrl}/${id}`);
  }
  deleteSerialSetById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  
  }
  
  exportSerialNumbersToCSV(serialSetName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/export/${serialSetName}`);
  }
  
  
}
