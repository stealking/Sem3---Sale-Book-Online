import { ElementRef, EventEmitter, QueryList } from '@angular/core';
import { BlockableUI } from '../common/api';
export declare class Accordion implements BlockableUI {
    el: ElementRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    tabs: AccordionTab[];
    constructor(el: ElementRef);
    addTab(tab: AccordionTab): void;
    getBlockableElement(): HTMLElement;
}
export declare class AccordionTab {
    accordion: Accordion;
    header: string;
    selected: boolean;
    disabled: boolean;
    selectedChange: EventEmitter<any>;
    headerFacet: QueryList<AccordionTab>;
    animating: boolean;
    hover: boolean;
    constructor(accordion: Accordion);
    toggle(event: any): boolean;
    findTabIndex(): number;
    readonly hasHeaderFacet: boolean;
}
export declare class AccordionModule {
}
