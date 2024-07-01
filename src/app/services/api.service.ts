import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    getData(): Observable<any> {
        const url = `https://jsonplaceholder.typicode.com/users`;
        // const options = {
        //     headers: {
        //     'Access-Control-Allow-Origin': '*'
        //     }
        // };
        return this.httpClient.get(url);
    }
}