import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ComponentWrapperLoaderService } from '../../services/component-wrapper-loader/component-wrapper-loader.service';
import {CustomFormComponent} from '../../interfaces/custom-form-component.interface';
import {CustomWcFormComponentInterface} from '../../interfaces/custom-wc-form-component.interface';
import { PanelComponent } from '../panel/panel.component';
import { CustomComponent } from '../../interfaces/custom-component.interface';

@Component({
  selector: 'advtech-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  public element: CustomFormComponent & CustomWcFormComponentInterface;
  public elementRef: ElementRef;

  @ViewChild('insertionPoint', {read: ViewContainerRef, static: true })
  public insertionPoint: ViewContainerRef;

  ngOnInit() {
  }

  createElement(config) {
    this.element = document.createElement(config.tag);

    this.element.label = config.label;
    this.insertionPoint.element.nativeElement.append(this.element);
    this.elementRef = new ElementRef(this.element);
  }
}
