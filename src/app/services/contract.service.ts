import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

import { PresidentialElectionAbi } from '../../common/constants/presidential_election_abi.const';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _provider: ethers.BrowserProvider;
  private _contract: ethers.Contract | any;

  constructor() {
    const { ethereum } = <any>window;
    this._provider = new ethers.BrowserProvider(ethereum);

    this.init().then(() => {
      this.candidateCount();
      // this.vote(2);
    });
  }

  async init() {
    try {
      const signer = await this._provider.getSigner();
      this._contract = new ethers.Contract(
        environment.contractAddress,
        PresidentialElectionAbi,
        signer,
      );
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  }

  async addCandidate(name: string) {
    try {
      const tx = await this._contract.addCandidate(name);
      await tx.wait();
      console.log('Candidate added successfully');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  }

  async vote(candidateId: number) {
    try {
      const tx = await this._contract.vote(candidateId);
      await tx.wait();
      console.log('Vote successful');
    } catch (error) {
      console.error('Error voting:', error);
    }
  }

  async getCandidate(candidateId: number) {
    try {
      const candidate = await this._contract.getCandidate(candidateId);
      console.log('Candidate:', candidate);
      return candidate;
    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
  }

  async candidateCount() {
    try {
      const count = await this._contract.candidateCount();
      console.log('Total candidates:', count.toString());
      return count;
    } catch (error) {
      console.error('Error fetching candidate count:', error);
    }
  }

  async hasVoted(address: string) {
    try {
      const voted = await this._contract.hasVoted(address);
      console.log('Has voted:', voted);
      return voted;
    } catch (error) {
      console.error('Error checking if user has voted:', error);
    }
  }
}
