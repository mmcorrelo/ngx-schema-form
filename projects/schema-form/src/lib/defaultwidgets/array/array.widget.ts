import { Component } from '@angular/core';

import { ArrayLayoutWidget } from '../../widget';
import { FormProperty } from '../../model';

@Component({
  selector: 'sf-array-widget',
  template: `
  <div class="widget form-group">
    <label
        [attr.for]="id"
        class="horizontal control-label">
        {{ schema.title }}
    </label>

    <span
        *ngIf="schema.description"
        class="formHelp">{{schema.description}}</span>

    <div *ngFor="let itemProperty of formProperty.properties">
        <sf-form-element [formProperty]="itemProperty"></sf-form-element>

        <button
            *ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
            [attr.disabled]="isRemoveButtonDisabled ? true: null"
            class="btn btn-default array-remove-button"
            (click)="removeItem(itemProperty)">
            <span
                class="glyphicon glyphicon-minus"
                aria-hidden="true"></span>
            Remove
        </button>
    </div>

    <button
        *ngIf="!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)"
        class="btn btn-default array-add-button"
        [attr.disabled]="isAddButtonDisabled ? true: null"
        (click)="addItem()">

        <span
            class="glyphicon glyphicon-plus"
            aria-hidden="true"></span>
        Add
    </button>
  </div>`
})
export class ArrayWidget extends ArrayLayoutWidget {
  buttonDisabledAdd: boolean;
  buttonDisabledRemove: boolean;

  addItem() {
    this.formProperty.addItem();
    this.updateButtonDisabledState();
  }

  removeItem(item: FormProperty) {
    this.formProperty.removeItem(item);
    this.updateButtonDisabledState();
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  updateButtonDisabledState() {
    this.buttonDisabledAdd = this.isAddButtonDisabled;
    this.buttonDisabledRemove = this.isRemoveButtonDisabled;
  }

  get isAddButtonDisabled() {
    return this.isPropertyArraySpec('maxItems') && this.formProperty.properties.length >= this.schema.maxItems;
  }

  get isRemoveButtonDisabled() {
    return this.isPropertyArraySpec('minItems') && this.formProperty.properties.length <= this.schema.minItems;
  }
}
