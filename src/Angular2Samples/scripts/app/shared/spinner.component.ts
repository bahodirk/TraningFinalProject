import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `<i *ngIf="visable" class="fa fa-spinner fa-spin fa-3x"></i>`
})

export class SpinnerComponent {
  @Input() visable=true;
}