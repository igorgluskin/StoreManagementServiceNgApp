import { Component, Input, Output, OnInit, SimpleChanges, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/store';
import { ModalComponent } from 'src/app/modal/modal.component';
import * as _ from 'lodash';


@Component({
  selector: 'store-details-component',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  @Input() store: Store;
  @Output() storeAction: EventEmitter<{action: string, store: Store}> = new EventEmitter();

  public storeDetailsForm: FormGroup;
  public editing = false;

  ngOnInit() {
    this.storeDetailsForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      location: this.fb.group({
        lat: [null],
        lon: [null]
      }),
      hours: [null],
      services: [[]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['store'] && this.store) {
      if (this.store.id) {
        this.editing = false;
      } else {
        this.editing = true;
      }
      this.setFormData();
    }
  }

  public removeService(index) {
    if (this.editing) this.storeDetailsForm.get('services').value.splice(index, 1);
  }

  public addService() {
    if (!this.editing) return;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '15rem',
      data: {
        title: 'Add New Service: ',
        showInput: true,
        button1: 'Cancel',
        button2: 'Add Service',
        data: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.storeDetailsForm.get('services').value.push(result);
    });

  }

  public setEditing(editing: boolean) {
    this.editing = editing;
    this.setFormData();
  }

  public setFormData() {
    this.storeDetailsForm.get('name').patchValue(this.store.name);
    this.storeDetailsForm.get('type').patchValue(this.store.type);
    this.storeDetailsForm.get('address').patchValue(this.store.address);
    this.storeDetailsForm.get('address2').patchValue(this.store.address2);
    this.storeDetailsForm.get('city').patchValue(this.store.city);
    this.storeDetailsForm.get('state').patchValue(this.store.state);
    this.storeDetailsForm.get('zip').patchValue(this.store.zip);
    this.storeDetailsForm.get('hours').patchValue(this.store.hours);
    this.storeDetailsForm.get('services').patchValue(_.cloneDeep(this.store.services));
    this.storeDetailsForm.get('location').get('lat').patchValue(this.store.location.lat);
    this.storeDetailsForm.get('location').get('lon').patchValue(this.store.location.lon);

    if (this.editing) {
      this.storeDetailsForm.enable();
    } else {
      this.storeDetailsForm.disable();
    }
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '14rem',
      data: {
        title: 'Confirm Deletion',
        content: 'This cannot be undone',
        button1: 'Cancel',
        button2: 'Confirm',
        data: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.storeAction.emit({action: 'Delete', store: {...this.store, ...(this.storeDetailsForm.getRawValue() as Store)}})
    });
  }

  public submitStore() {
    this.storeAction.emit({action: 'Submit', store: {...this.store, ...(this.storeDetailsForm.getRawValue() as Store)}})
  }

}