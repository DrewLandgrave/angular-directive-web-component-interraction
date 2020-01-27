import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CustomFormComponent } from 'src/app/interfaces/custom-form-component.interface';

@Component({
  selector: 'advtech-advtech-textarea-input',
  templateUrl: './advtech-textarea-input.component.html',
  styleUrls: ['./advtech-textarea-input.component.scss']
})
export class AdvtechTextareaInputComponent implements AfterViewInit, CustomFormComponent {
  @Input() label;

  @Input()
  value = '';

  @ViewChild('input', { static: true })
  input: ElementRef;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  @Input()
  getValue = () => {
    return this.elRef.nativeElement.value;
  }

  @Input()
  setValue = (value: any) => {
    this.elRef.nativeElement.value = value;
    this.elRef.nativeElement.querySelector('textarea').value = value;
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
