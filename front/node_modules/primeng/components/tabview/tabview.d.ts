import { ElementRef, EventEmitter, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from '../common/api';
export declare class TabPanel {
    header: string;
    selected: boolean;
    disabled: boolean;
    closable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    leftIcon: string;
    rightIcon: string;
    hoverHeader: boolean;
    closed: boolean;
}
export declare class TabView implements AfterContentInit, BlockableUI {
    el: ElementRef;
    orientation: string;
    style: any;
    styleClass: string;
    controlClose: boolean;
    tabPanels: QueryList<TabPanel>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    initialized: boolean;
    tabs: TabPanel[];
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    initTabs(): void;
    open(event: Event, tab: TabPanel): void;
    close(event: Event, tab: TabPanel): void;
    closeTab(tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getDefaultHeaderClass(tab: TabPanel): string;
    getBlockableElement(): HTMLElement;
}
export declare class TabViewModule {
}
