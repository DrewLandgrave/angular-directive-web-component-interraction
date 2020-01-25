import { Directive, OnInit, forwardRef, HostBinding, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[advtechWcFormControl]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WebComponentFormControlDirective),
            multi: true
        }
    ]
})
export class WebComponentFormControlDirective implements ControlValueAccessor  {
    private internalValue: number;

    onChange: any = () => {};
    onTouched: any = () => {};


    get value() {
        return this.internalValue;
    }

    set value(val) {
        if (val !== this.internalValue) {
            this.internalValue = val;
            this.onChange(this.internalValue);
            this.onTouched();
            this.elementRef.nativeElement.value = val;
        }
    }

    constructor(private elementRef: ElementRef) { }

    @HostListener('valueChange', ['$event.detail'])
    listenForValueChange(value) {
        this.value = value;
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
