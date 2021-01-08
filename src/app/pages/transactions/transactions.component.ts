import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import Item from 'src/app/models/item';
import Transaction from 'src/app/models/transaction';
import { TransactionService } from 'src/app/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  itemList: any = "";
  transactions: Transaction[] = [];
  transactionAccount: string = "";
  transactionDescription: string = "";
  categories: string[] = [];
  transactionCategory: string = "";
  transactionAmount: number = 0;
  displayModal: boolean;
  showItemModal: boolean;
  constructor(private transactionService: TransactionService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        let iList:string[] = [];
        transactions.forEach(transaction => {
          transaction.items.forEach(itemListing => {
            iList = iList + itemListing.item.name;
          });

          transaction.itemList = iList;
        });

        console.log(transactions);
      });

  }

  setItems(transaction){
    // let tList = transaction.items.map(item => item.id);
    // let param = {
    //   list: tList
    // };
    // this.itemService.getItemList(param)
    //   .subscribe((items: Item[]) => {
    //     transaction.items.forEach(tItem => {
    //       let newItem = {
    //         amount: tItem.amount,
    //         item: null
    //       };

    //       newItem.item = items.filter(function(element, index, array) {
    //         return (element._id == tItem.id);
    //       })[0];

    //       this.itemList.push(newItem);
    //     });

    //     this.showItems();
    //   });

    this.itemList = transaction.items;
    this.showItems();
  }

  clearItemList() {
    this.itemList = [];
  }

  showModalDialog() {
    this.displayModal = true;
  }

  showItems(){
    this.showItemModal = true;
  }
}

