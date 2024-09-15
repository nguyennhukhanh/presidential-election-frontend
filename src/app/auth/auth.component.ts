import { Component, Inject } from '@angular/core';

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
    @Inject(WalletService) private readonly walletService: WalletService,
  ) {}
  async loginWithGoogle() {}

  async loginWithMetamask(): Promise<void> {
    try {
      const accounts = await this.walletService.connectWallet();
      console.log(accounts);
    } catch (error) {
      throw error;
    }
  }
}
