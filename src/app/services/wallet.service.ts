import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly ethereum;
  constructor(@Inject(HttpClient) private http: HttpClient) {
    const { ethereum } = <any>window;
    this.ethereum = ethereum;
  }

  async connectWallet() {
    try {
      if (!this.ethereum) return toast.error('Please install MetaMask');
      const accounts = (await this.ethereum.request({
        method: 'eth_requestAccounts',
      })) as Array<string>;
      return accounts;
    } catch (error) {
      throw new Error('No ethereum object found');
    }
  }

  async checkWalletConnected() {
    try {
      if (!this.ethereum) return toast.error('Please install MetaMask');
      const accounts = (await this.ethereum.request({
        method: 'eth_accounts',
      })) as Array<string>;
      return accounts;
    } catch (e) {
      throw new Error('No ethereum object found');
    }
  }
}
