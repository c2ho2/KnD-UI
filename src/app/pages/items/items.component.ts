import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import Item from 'src/app/models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  columns: string[] = [];
  items: Item[] = [];
  itemName: string = "";
  brands: string[] = [];
  brandList: Object[] = [];
  itemBrand: string = "";
  categories: string[] = [];
  categoryList: Object[] = [];
  itemCategory: string = "";
  volumes: string[] = [];
  volumeList: Object[] = [];
  itemVolume: string = "";
  itemCost: number = 0;
  itemPrice: number = 0;  
  displayModal: boolean;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems()
      .subscribe((items: Item[]) => {
        this.items = items
      });

    this.itemService.getBrands()
      .subscribe((brands: string[]) => {
        this.brands = brands
        this.brands.forEach(brand => {          
          let brandItem = {
            label: brand,
            value: brand
          }

          this.brandList.push(brandItem);
        });
      });

    this.itemService.getCategories()
      .subscribe((categories: string[]) => {
        this.categories = categories
        this.categories.forEach(category => {          
          let categoryItem = {
            label: category,            
            value: category
          }

          this.categoryList.push(categoryItem);
        });
      });

    this.itemService.getVolumes()
      .subscribe((volumes: string[]) => {
        this.volumes = volumes
        this.volumes.forEach(volume => {          
          let volumeItem = {
            label: volume,
            value: volume
          }

          this.volumeList.push(volumeItem);
        });
      });

    let x:Item = {
      _id: "A",
      name: "test",
      brand:  "test",
      category: "test",
      volume: "10ml",
      stock: 1,
      cost: 5,
      price: 10
    };
    
    const values = Object.getOwnPropertyNames(x);
    values.forEach(function(value, index) {
      values[index] = value.charAt(0).toUpperCase() + value.slice(1);
    });

    this.columns = values;
  }

  addStock(item:Item){
    let newStock = item.stock + 1;
    this.itemService.updateItem(item._id, {stock: newStock})
      .subscribe((item: Item) => {
        this.itemService.getItems()
          .subscribe((items: Item[]) => {
            this.items = items
          });
      });
  }

  removeStock(item:Item){
    let newStock = item.stock - 1;
    this.itemService.updateItem(item._id, {stock: newStock})
      .subscribe((item: Item) => {
        this.itemService.getItems()
          .subscribe((items: Item[]) => {
            this.items = items
          });
      });
  }

  // setBrand(brand:string){
  //   this.itemBrand = brand;
  // }

  // setCategory(category:string){
  //   this.itemCategory = category;
  // }

  // setVolume(volume:string){
  //   this.itemVolume = volume;
  // }

  setCP(){
    if(this.itemVolume == "250ml" || this.itemVolume == "236ml" )
    {
      this.itemCost = 100;
      this.itemPrice = 150;
    }
  }

  saveItem(){
    let item:Item = <Item>({
      name: this.itemName,
      brand: this.itemBrand,
      category: this.itemCategory,
      volume: this.itemVolume,
      stock: 1,
      cost: this.itemCost,
      price: this.itemPrice
    });

    console.log(item);

    this.itemService.createItem(item)
      .subscribe((item: Item) => {
        this.items.push(item);
        
        this.clearModalInputs();
      });
  }

  clearModalInputs(){
    this.itemBrand = "";
    this.itemCategory = "";
    this.itemCost = 0;
    this.itemName = "";
    this.itemPrice = 0;
    this.itemVolume = "";
  }

  showModalDialog() {
    this.displayModal = true;
  }
}
