import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private webService: WebService) { }

  getItems() {
    return this.webService.get('items');
  }

  getItem(id: string) {
    return this.webService.get(`items/${id}`);
  }

  getItemList(list: any) {
    return this.webService.find('items/list', list)
  }

  findItems(query: any) {
    return this.webService.find('items', query);
  }

  createItem(payload: Object) {
    return this.webService.post('items', payload);
  }

  updateItem(id:string, payload: Object){
    return this.webService.patch(`items/${id}`, payload);
  }

  getBrands() {
    return this.webService.get('brands');
  }

  getCategories() {
    return this.webService.get('categories');
  }

  getVolumes() {
    return this.webService.get('volumes');
  }
}
