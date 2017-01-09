import { ElementRef } from '@angular/core';
export declare class InputText {
    el: ElementRef;
    hover: boolean;
    focus: boolean;
    constructor(el: ElementRef);
    onMouseover(e: any): void;
    onMouseout(e: any): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    readonly disabled: boolean;
    readonly filled: boolean;
}
export declare class InputTextModule {
}
