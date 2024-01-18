import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class loginService{
    private apiUrl = 'https://localhost:7136/api';

    constructor(private http: HttpClient) { }

    login(UserName:string, Password:string){
        const credentials = {UserName , Password};
        return this.http.post<any>(`${this.apiUrl}/Login`, credentials);

    }

}
