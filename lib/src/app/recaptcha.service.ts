import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RecaptchaService {

  private readonly apiUrl = 'https://www.google.com/recaptcha/api/siteverify';

  constructor(
    private http: HttpClient
  ) { }

  validateToken(body) {
    return this.http.post(this.apiUrl, body);
  }

}
