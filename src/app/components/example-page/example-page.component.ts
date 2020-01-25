import {AfterViewInit, Component, ComponentRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdvtechTextInputComponent} from '../../components/advtech-text-input/advtech-text-input.component';
import {ComponentWrapperLoaderService} from '../../services/component-wrapper-loader/component-wrapper-loader.service';
import {EnvConfigService} from '../../services/env-config/env-config.service';
import {SyncWcFieldDirective} from '../../directives/sync-wc-field/sync-wc-field.directive';
import {WrapperComponent} from '../wrapper/wrapper.component';

@Component({
    selector: 'app-example-page',
    templateUrl: './example-page.component.html',
    styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit, AfterViewInit {
    config: any;

    form: FormGroup;

    @ViewChild('mainColumn', {read: ViewContainerRef, static: false})
    mainColumn: ViewContainerRef;

    @ViewChild('master', {static: true})
    master: AdvtechTextInputComponent;

    wrapperRegistry: { [key: string]: ComponentRef<WrapperComponent> } = {};

    constructor(
        private envConfigService: EnvConfigService,
        private componentWrapperLoaderService: ComponentWrapperLoaderService,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        this.form = new FormBuilder().group({
            master: {
                value: '',
            },
            sync: {
                value: '',
            },
        });

    }

    ngAfterViewInit(): void {
        this.config = this.envConfigService.getConfig();
        this.buildPage();
    }

    private buildPage() {
        this.config.columns.mainColumn.forEach(config => {
            const panel = this.componentWrapperLoaderService.loadComponent(this.mainColumn);
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

        this.config.syncConfig.forEach(config => {
            const slaveWrapperComponent = this.wrapperRegistry[config.slave];
            const directive = new SyncWcFieldDirective(slaveWrapperComponent.instance.elementRef, this.renderer);
            directive.parent = this.wrapperRegistry[config.master].instance.element;
            directive.self = slaveWrapperComponent.instance.element;
            directive.ngAfterViewInit();
        });
    }
}
