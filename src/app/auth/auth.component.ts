import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { WalletEnum } from '../../common/enums';
import { AuthApiEnum, GroupApiEnum } from '../../common/enums/api.enum';
import type { IResponse } from '../../common/interfaces/response.interface';
import { environment } from '../../environments/environment.development';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export class AuthComponent {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(Router) private router: Router,
    @Inject(WalletService) private readonly walletService: WalletService,
  ) {}
  async loginWithGoogle() {}

  private async connectWallet(): Promise<string> {
    try {
      const accounts = await this.walletService.connectWallet();
      return accounts[0];
    } catch (error) {
      throw error;
    }
  }

  private async getNonce(): Promise<{ walletAddress: string; nonce: number }> {
    try {
      const walletAddress = await this.connectWallet();
      const body = { walletAddress };
      const response = await firstValueFrom(
        this.http.post<IResponse>(
          `${environment.apiUrl}${GroupApiEnum.User}${AuthApiEnum.GetNonce}`,
          body,
        ),
      );

      return {
        walletAddress,
        nonce: response?.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginWithMetamask() {
    try {
      const { walletAddress, nonce } = await this.getNonce();
      const message = `${WalletEnum.Message} ${nonce}`;

      const signature = await this.walletService.getSignature(
        message,
        walletAddress,
      );

      const body = { walletAddress, signature };
      const response = await firstValueFrom(
        this.http.post<IResponse>(
          `${environment.apiUrl}${GroupApiEnum.User}${AuthApiEnum.LoginWithMetamask}`,
          body,
        ),
      );

      this.saveTokens(response?.data?.tokens);
    } catch (error) {
      throw error;
    }
  }

  private saveTokens(tokens: object) {
    localStorage.setItem('tokens', JSON.stringify(tokens));

    this.router.navigate(['']);
  }
}
