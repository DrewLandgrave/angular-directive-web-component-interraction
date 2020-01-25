# angular-directive-web-component-interraction

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-directive-web-component-interraction)

This repo is built off of the [angular-config-drive-layout](https://github.com/DrewLandgrave/angular-config-driven-layout). See that repo for a explanation of how the page is built.

## Directives
### SyncFieldDirective
This directive is for use on normal angular components. As this directive will work for only hardcoded elements in the templates and *not* on dynamically loaded web components. The Directive has 3 inputs `parent`, `self`, and `appendTarget`.
* parent should be an angular component tht implements the `CustomFormComponent` interface.
* self should be the angular component you're adding the directive too
* appendTarget should be the `document.querySelector` selector string that we will add the sync button to.

The directive will also attach a `click` listener to the button to fire the `hClick` method. `hClick` will grab the value from the parent component and set the self component's value.

The directive is attached as below
```html
<advtech-text-input advtechWcFormControl formControlName="master" #master label="Master Field"></advtech-text-input>
<advtech-text-input advtechWcFormControl formControlName="sync" #sync label="Sync Field" advtechSyncField [parent]="master" [self]="sync" appendTarget='mat-form-field'></advtech-text-input>
```

### SyncWcFieldDirective
This directive does largely what the above one does. However due to some weirdness with angular/elements and the scoping of this on it's compiled javascript this class was created to facilitate these web components. It's elements should implement the `CustomWcFormComponentInterface`. 

This directive is added programatically during the dynamic component loding process as below:

```ts
initSyncFields(configs){
    configs.forEach(config => {
        const slaveWrapperComponent = this.wrapperRegistry[config.slave];
        const directive = new SyncWcFieldDirective(slaveWrapperComponent.instance.elementRef, this.renderer);

        directive.parent = this.wrapperRegistry[config.master].instance.element;
        directive.self = slaveWrapperComponent.instance.element;
        directive.ngAfterViewInit();
    });
}
```

See an example of this running on [StackBlitz ⚡️](https://stackblitz.com/edit/angular-directive-web-component-interraction)
]