import { Component } from '@angular/core';
import { ControlWidget } from '../../widget';

@Component({
  selector: 'sf-select-widget',
  template: `
  <select
        *ngIf="schema.type!='array'"
        [formControl]="control"
        [attr.name]="name"
        [attr.id]="id"
        [attr.disabled]="schema.readOnly ? true : null"
        [disableControl]="schema.readOnly"
        class="form-control">

        <ng-container *ngIf="schema.oneOf; else use_enum">
            <option
                *ngFor="let option of schema.oneOf"
                [ngValue]="option.enum[0]">
                {{option.description}}
            </option>
        </ng-container>

        <ng-template #use_enum>
            <option
                *ngFor="let option of schema.enum"
                [ngValue]="option">
                {{option}}
            </option>
        </ng-template>
    </select>

    <select
        *ngIf="schema.type==='array'"
        multiple
        [formControl]="control"
        [attr.name]="name"
        [attr.id]="id"
        [attr.disabled]="schema.readOnly ? true : null"
        [disableControl]="schema.readOnly"
        class="form-control">

        <option
            *ngFor="let option of schema.items.oneOf"
            [ngValue]="option.enum[0]"
            [attr.disabled]="option.readOnly ? true : null">
            {{option.description}}
        </option>
    </select>

    <input
        *ngIf="schema.readOnly"
        [attr.name]="name"
        type="hidden"
        [formControl]="control">
  </div>`
})
export class SelectWidget extends ControlWidget { }
