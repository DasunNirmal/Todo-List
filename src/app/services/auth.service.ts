import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface SignInRequest {
  email: string;
  password: string;
}

interface JWTAuthResponse {
  token: string;
  tokenType: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/todo/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: SignInRequest): Observable<JWTAuthResponse> {
    return this.http.post<JWTAuthResponse>(`${this.apiUrl}/signIn`, credentials);
  }

  register(userData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
