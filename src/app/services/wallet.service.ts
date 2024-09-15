import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly ethereum;
  constructor() {
    const { ethereum } = <any>window;
    this.ethereum = ethereum;
  }

  async connectWallet(): Promise<Array<string>> {
    try {
      if (!this.ethereum) {
        toast.error('Please install MetaMask');
        throw new Error('Please install MetaMask');
      }

      const accounts = (await this.ethereum.request({
        method: 'eth_requestAccounts',
      })) as Array<string>;
      return accounts;
    } catch (error) {
      throw error;
    }
  }

  async checkWalletConnected(): Promise<Array<string>> {
    try {
      if (!this.ethereum) {
        toast.error('Please install MetaMask');
        throw new Error('Please install MetaMask');
      }

      const accounts = (await this.ethereum.request({
        method: 'eth_accounts',
      })) as Array<string>;
      return accounts;
    } catch (error) {
      throw error;
    }
  }

  async getSignature(message: string, walletAddress: string): Promise<string> {
    return this.ethereum.request({
      method: 'personal_sign',
      params: [message, walletAddress],
    });
  }
}
