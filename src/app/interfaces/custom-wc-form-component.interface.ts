import {CustomFormComponent} from './custom-form-component.interface';

export interface CustomWcFormComponentInterface extends CustomFormComponent {
    getWcValue();

    setWcValue(value: any);
}
