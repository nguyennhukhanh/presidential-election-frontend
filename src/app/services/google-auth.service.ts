import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private redirectUri = window.location.origin + '/auth';
  private scope = 'openid profile email';
  constructor() {}

  async login(): Promise<void> {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.clientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=${this.scope}&include_granted_scopes=true&prompt=consent`;

    window.location.href = googleOAuthUrl;
  }
}
