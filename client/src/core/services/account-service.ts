import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private https = inject(HttpClient);

  baseUrl = 'https://localhost:7131/api/';

  login(creds: any) {
    return this.https.post(this.baseUrl + 'account/login', creds);
  }
}
