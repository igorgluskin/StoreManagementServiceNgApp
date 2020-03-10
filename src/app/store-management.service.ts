import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from './Store';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreManagementService {

  constructor( private http: HttpClient ) { }

  public getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>('api/store');
  }

  public submitNewStore(store: Store): Observable<Store> {
    return this.http.post<Store>('api/store', store);
  }
  
  public submitExistingStore(store: Store): Observable<Store> {
    return this.http.put<Store>('api/store', store);
  }

  public deleteStore(storeId): Observable<Store> {
    return this.http.delete<Store>(`api/store/${storeId}`);
  }

}