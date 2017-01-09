import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioButton implements ControlValueAccessor, AfterViewInit {
    value: any;
    name: string;
    disabled: boolean;
    label: string;
    onClick: EventEmitter<any>;
    inputViewChild: ElementRef;
    input: HTMLInputElement;
    onModelChange: Function;
    onModelTouched: Function;
    checked: boolean;
    hover: boolean;
    focused: boolean;
    ngAfterViewInit(): void;
    handleClick(): void;
    select(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    onChange(event: any): void;
}
export declare class RadioButtonModule {
}
