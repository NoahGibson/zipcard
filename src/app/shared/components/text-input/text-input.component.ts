import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * @ignore
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputComponent),
    multi: true
};

/**
 * Application specific component for text input.
 */
@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextInputComponent implements ControlValueAccessor {

    /**
     * Input type, i.e. text, password, etc.
     */
    @Input() type = 'text';

    /**
     * The placeholder for the input field.
     */
    @Input() placeholder: string;

    /**
     * The label for the input field.
     */
    @Input() label: string;

    /**
     * Whether or not the input field is in focus by default.
     */
    @Input() focused = false;

    /**
     * Whether or not the input field is disabled.
     */
    @Input() disabled = false;

    /**
     * The internal data for form control value access.
     * @ignore
     */
    private innerValue: any = '';

    /**
     * Function to propagate change within the form.
     * @ignore
     */
    private propagateChange = (_: any) => {};

    /**
     * @ignore
     */
    constructor() {}

    /**
     * Event triggered on every change to input field.
     * @ignore
     */
    onChange(e: any): void {
        this.innerValue = e.detail.value;
        this.propagateChange(this.innerValue);
    }

    /**
     * Handling focusing of input element.
     * @ignore
     */
    private onFocus(): void {
        this.focused = true;
    }

    /**
     * Handling blurring of input element.
     * @ignore
     */
    private onBlur(): void {
        this.focused = false;
    }

    /**
     * From ControlValueAccessor interface.
     * @ignore
     */
    writeValue(value: any): void {
        if (value) {
            this.innerValue = value;
        }
    }

    /**
     * From ControlValueAccessor interface.
     * @ignore
     */
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    /**
     * From ControlValueAccessor interface.
     * @ignore
     */
    registerOnTouched(fn: any): void {}

}
