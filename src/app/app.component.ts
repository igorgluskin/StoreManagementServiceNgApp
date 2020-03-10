import { Component } from '@angular/core';
import { StoreManagementService } from './store-management.service';
import { Store } from './Store';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private smService: StoreManagementService) { }

  public stores: Store[] = [];
  public selectedStore: Store;

  ngOnInit() {
    this.smService.getAllStores().subscribe(resp => {
      this.stores = resp;
    });
  }

  public selectStore(store: Store) {
    this.selectedStore = store;
  }

  public createNew() {
    this.selectedStore = {
        id: null,
        type: null,
        name: null,
        address: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        location: {
          lat: null,
          lon: null,
        },
        hours: null,
        services: []
    }
  }

  public handleStoreAction(event) {
    switch (event.action) {
      case 'Submit': {
        if (event.store.id) {
          this.smService.submitExistingStore(event.store).subscribe(resp => {
            this.stores[_.findIndex(this.stores, s => { return s.id == resp.id; })] = resp;
            alert(resp.name + ' successfully updated!');
          }, err => {
            alert('An error has occurred!');
          });
        } else {
          this.smService.submitNewStore(event.store).subscribe(resp => {
            this.stores.push(resp);
            alert(resp.name + ' successfully created!');
          }, err => {
            alert('An error has occurred!');
          });
        }
        break;
      }
      case 'Delete': {
        this.smService.deleteStore(event.store.id).subscribe(resp => {
          _.remove(this.stores, s => { return s.id == resp.id});
          alert(resp.name + ' successfully deleted');
        }, err => {
          alert('An error has occurred!');
        });
        break;
      }
      default: {
        console.log(event.action, ' is not a supported action');
      }
    }
  }
}
