import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {CustomFormComponent} from '../../interfaces/custom-form-component.interface';
import {CustomWcFormComponentInterface} from '../../interfaces/custom-wc-form-component.interface';

@Component({
  selector: 'advtech-text-input',
  templateUrl: './advtech-text-input.component.html',
  styleUrls: ['./advtech-text-input.component.scss'],
})
export class AdvtechTextInputComponent implements AfterViewInit, CustomWcFormComponentInterface, OnDestroy {
  @Input() label;

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
    return (this as any).querySelector('input').value;
  }

  @Input()
  setWcValue(value: string) {
    (this as any).querySelector('input').value = value;
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

  ngOnDestroy() {
    console.log('destroy');
  }

}
