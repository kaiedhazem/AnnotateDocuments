import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonGenerateService {

  constructor(private http: HttpClient) { }

  public generateJson(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    console.log(data);
    
    return this.http.post('http://localhost:8000/generate_json', data, { headers });
  }
}
