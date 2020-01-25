import {Directive, ElementRef, Input, Renderer2, AfterViewInit} from '@angular/core';
import {CustomFormComponent} from '../../interfaces/custom-form-component.interface';
import {CustomWcFormComponentInterface} from '../../interfaces/custom-wc-form-component.interface';
import {SyncFieldDirective} from '../sync-field/sync-field.directive';

/**
 * @description Used to append a sync button to the host element
 * # Inputs
 * |Input|Usage|
 * |---|---|
 * |advtechSyncField| Used to pass in the parent, self, and appendTarget object|
 *
 * # advtechSyncField Properties
 * |Property|Description|
 * |---|---|
 * |parent|The component to sync with I.e. get the value from|
 * |self|Reference to the host component|
 * |appendTarget|The element to search for to append the button|
 * @usage
 * ```html
 *    <advtech-headline-input #head></advtech-headline-input>
 *    <advtech-promo-head #promoHead [advtechSyncField]="{parent: #head, self: #promoHead}"></advtech-promo-head>
 * OR
 *    <advtech-headline-input #head></advtech-headline-input>
 *    <advtech-promo-head #promoHead [advtechSyncField]="{parent: #head, self: #promoHead, appendTarget: 'ion-list'}"></advtech-promo-head>
 * ```
 */
@Directive({selector: '[advtechSyncWcField]'})
export class SyncWcFieldDirective extends SyncFieldDirective implements AfterViewInit {
    @Input()
    parent: CustomWcFormComponentInterface;

    @Input()
    self: CustomWcFormComponentInterface;

    @Input()
    appendTarget: string;

    /** @inheritdoc */
    ngAfterViewInit() {
        const button = this.renderer.createElement('button');
        button.classList.add('sync-button');
        button.innerHTML = '<i class="material-icons">autorenew</i>';
        const appendTargetElement = this.el.nativeElement.querySelector('[class*=mat-form-field]');
        appendTargetElement.classList.add('has-sync-button');
        this.renderer.appendChild(appendTargetElement, button);
        this.renderer.listen(button, 'click', (e) => this.hClick(e));
    }

    /**
     * Handles clicking the sync button and syncs the parent value to the host
     */
    hClick(e): void {
        e.preventDefault();
        e.stopPropagation();
        const value = this.parent.getWcValue();
        // tslint:disable-next-line: no-unused-expression
        value && this.self.setWcValue(value);
    }
}
