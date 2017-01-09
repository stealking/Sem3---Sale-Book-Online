import { EventEmitter, ElementRef } from '@angular/core';
import { BlockableUI } from '../common/api';
export declare class Fieldset implements BlockableUI {
    private el;
    legend: string;
    toggleable: boolean;
    collapsed: boolean;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    style: any;
    styleClass: string;
    hover: boolean;
    animating: boolean;
    constructor(el: ElementRef);
    onLegendMouseenter(event: any): void;
    onLegendMouseleave(event: any): void;
    toggle(event: any): void;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
}
export declare class FieldsetModule {
}
