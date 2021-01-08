import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private webService: WebService) { }

  getTransactions() {
    return this.webService.get('transactions');
  }
}
