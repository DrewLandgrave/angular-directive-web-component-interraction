import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageBuilderService } from 'src/app/services/page-builder/page-builder.service';
import { AdvtechTextInputComponent } from '../../components/advtech-text-input/advtech-text-input.component';
import { EnvConfigService } from '../../services/env-config/env-config.service';

@Component({
    selector: 'app-example-page',
    templateUrl: './example-page.component.html',
    styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit, AfterViewInit {
    config: any;

    form: FormGroup;

    @ViewChild('mainColumn', { read: ViewContainerRef, static: false })
    mainColumn: ViewContainerRef;

    @ViewChild('master', { static: true })
    master: AdvtechTextInputComponent;

    viewContainerRefRegistry: { [key: string]: ViewContainerRef } = {};

    constructor(
        private envConfigService: EnvConfigService,
        private pageBuilderService: PageBuilderService,
        private renderer: Renderer2) {
            pageBuilderService.renderer = renderer;
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
        this.viewContainerRefRegistry['mainColumn'] = this.mainColumn;
        this.buildPage();
    }

    private buildPage() {
        Object.keys(this.config.columns).forEach(key => {
            this.pageBuilderService.buildColumns(this.config.columns[key], this.viewContainerRefRegistry[key]);
        });

        this.pageBuilderService.initSyncFields(this.config.syncConfig);

    }
}
