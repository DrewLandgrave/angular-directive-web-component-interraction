import { ComponentWrapperLoaderService } from "../component-wrapper-loader/component-wrapper-loader.service";
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { ViewContainerRef, Injectable, ComponentRef, Renderer2 } from '@angular/core';
import { SyncWcFieldDirective } from 'src/app/directives/sync-wc-field/sync-wc-field.directive';

@Injectable({
    providedIn: 'root'
})
export class PageBuilderService {
    wrapperRegistry: { [key: string]: ComponentRef<WrapperComponent> } = {};
    renderer: Renderer2;
    constructor(
        private componentWrapperLoaderService: ComponentWrapperLoaderService) { 
            
        }

    buildColumns(columnConfig: any, viewContainer: ViewContainerRef) {
        columnConfig.forEach(config => {
            const panel = this.componentWrapperLoaderService.loadComponent(viewContainer);
            panel.instance.createElement(config);
            config.children.forEach(childConfig => {
                const wrapperComponentComponentRef: ComponentRef<WrapperComponent> =
                    this.componentWrapperLoaderService.loadComponent(panel.instance.insertionPoint);
                wrapperComponentComponentRef.instance.createElement(childConfig);
                this.wrapperRegistry[childConfig.formName] = wrapperComponentComponentRef;
                (panel.instance.element as any).insertChild(wrapperComponentComponentRef.hostView);
                const domElement = document.createElement(childConfig.tag);
                domElement.label = childConfig.label;
            });
        });
    }

    initSyncFields(configs){
        configs.forEach(config => {
            const slaveWrapperComponent = this.wrapperRegistry[config.slave];
            const directive = new SyncWcFieldDirective(slaveWrapperComponent.instance.elementRef, this.renderer);
            directive.parent = this.wrapperRegistry[config.master].instance.element;
            directive.self = slaveWrapperComponent.instance.element;
            directive.ngAfterViewInit();
        });
    }
}
