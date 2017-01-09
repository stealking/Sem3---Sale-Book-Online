import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Button implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    iconPos: string;
    cornerStyleClass: string;
    _label: string;
    _icon: string;
    hover: boolean;
    focus: boolean;
    active: boolean;
    initialized: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    ngAfterViewInit(): void;
    onMouseenter(e: Event): void;
    onMouseleave(e: Event): void;
    onMouseDown(e: Event): void;
    onMouseUp(e: Event): void;
    onFocus(e: Event): void;
    onBlur(e: Event): void;
    isDisabled(): any;
    getStyleClass(): string;
    label: string;
    icon: string;
    ngOnDestroy(): void;
}
export declare class ButtonModule {
}
