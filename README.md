# angular-directive-web-component-interraction

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-directive-web-component-interraction)

This repo is built off of the [angular-config-drive-layout](https://github.com/DrewLandgrave/angular-config-driven-layout). See that repo for a explanation of how the page is built.

## Directives
### SyncFieldDirective
This directive will append a sync button to a filed. It will take the value from one field and set it in the field with the sync button. The Directive has 3 inputs `parent`, `self`, and `appendTarget`.
* parent should be an angular component tht implements the `CustomFormComponent` interface.
* self should be the angular component you're adding the directive too
* appendTarget should be the `document.querySelector` selector string that we will add the sync button to.

The directive will also attach a `click` listener to the button to fire the `hClick` method. `hClick` will grab the value from the parent component and set the self component's value.

The directive is attached as below
```html
<advtech-text-input advtechWcFormControl formControlName="master" #master label="Master Field"></advtech-text-input>
<advtech-text-input advtechWcFormControl formControlName="sync" #sync label="Sync Field" advtechSyncField [parent]="master" [self]="sync" appendTarget='mat-form-field'></advtech-text-input>
```

## Angular Elements Caveat
### this scoping inside your elements
In angular elements if you do the following

```ts
export class MyCustomComponent {
    @Input()
    myFunction(){}
}
```
`this` inside the function will be assigned to the HTMLElement you called it from. However if you do the following:

```ts
export class MyCustomComponent {
    @Input()
    myFunction = () => {}
}
```
`this` will be assinged to `MyCustomComponent`

See an example of this running on [StackBlitz ⚡️](https://stackblitz.com/edit/angular-directive-web-component-interraction)
