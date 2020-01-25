import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {CustomWcFormComponentInterface} from '../../interfaces/custom-wc-form-component.interface';

@Component({
  selector: 'advtech-advtech-textarea-input',
  templateUrl: './advtech-textarea-input.component.html',
  styleUrls: ['./advtech-textarea-input.component.scss']
})
export class AdvtechTextareaInputComponent implements AfterViewInit, CustomWcFormComponentInterface {
  @Input() label;

  @Input()
  value = '';

  @ViewChild('input', {static: true})
  input: ElementRef;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  getValue() {
    return this.elRef.nativeElement.value;
  }

  @Input()
  getWcValue() {
    return (this as any).querySelector('textarea').value;
  }

  @Input()
  setWcValue(value: string) {
    (this as any).querySelector('textarea').value = value;
    (this as any).dispatchEvent(new CustomEvent('change'));
  }

  setValue(value: any) {
    this.elRef.nativeElement.value = value;
    this.elRef.nativeElement.querySelector('input').value = value;
  }

  ngAfterViewInit() {
    const nativeElement = this.input.nativeElement;

    nativeElement.addEventListener('change', (e) => {
      this.valueChange.emit(nativeElement.value);
      this.changeDetectorRef.detectChanges();
      this.setValue(nativeElement.value);
    });
  }
}
