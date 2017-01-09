"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var shared_1 = require('../common/shared');
var paginator_1 = require('../paginator/paginator');
var inputtext_1 = require('../inputtext/inputtext');
var shared_2 = require('../common/shared');
var domhandler_1 = require('../dom/domhandler');
var DTRadioButton = (function () {
    function DTRadioButton() {
        this.onClick = new core_1.EventEmitter();
    }
    DTRadioButton.prototype.handleClick = function (event) {
        this.onClick.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DTRadioButton.prototype, "checked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DTRadioButton.prototype, "onClick", void 0);
    DTRadioButton = __decorate([
        core_1.Component({
            selector: 'p-dtRadioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [checked]=\"checked\">\n            </div>\n            <div class=\"ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default\" (click)=\"handleClick($event)\"\n                        (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\"\n                        [ngClass]=\"{'ui-state-hover':hover,'ui-state-active':checked}\">\n                <span class=\"ui-radiobutton-icon\" [ngClass]=\"{'fa fa-circle':checked}\"></span>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DTRadioButton);
    return DTRadioButton;
}());
exports.DTRadioButton = DTRadioButton;
var DTCheckbox = (function () {
    function DTCheckbox() {
        this.onChange = new core_1.EventEmitter();
    }
    DTCheckbox.prototype.handleClick = function (event) {
        if (!this.disabled) {
            this.onChange.emit({ originalEvent: event, checked: !this.checked });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DTCheckbox.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DTCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DTCheckbox.prototype, "onChange", void 0);
    DTCheckbox = __decorate([
        core_1.Component({
            selector: 'p-dtCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"handleClick($event)\"\n                        (mouseover)=\"hover=true\" (mouseout)=\"hover=false\" \n                        [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-active':checked&&!disabled,'ui-state-disabled':disabled}\">\n                <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-check':checked}\"></span>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DTCheckbox);
    return DTCheckbox;
}());
exports.DTCheckbox = DTCheckbox;
var RowExpansionLoader = (function () {
    function RowExpansionLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    RowExpansionLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], RowExpansionLoader.prototype, "template", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RowExpansionLoader.prototype, "rowData", void 0);
    RowExpansionLoader = __decorate([
        core_1.Component({
            selector: 'p-rowExpansionLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], RowExpansionLoader);
    return RowExpansionLoader;
}());
exports.RowExpansionLoader = RowExpansionLoader;
var DataTable = (function () {
    function DataTable(el, domHandler, differs, renderer, changeDetector) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        this.pageLinks = 5;
        this.selectionChange = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onRowDblclick = new core_1.EventEmitter();
        this.onHeaderCheckboxToggle = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.filterDelay = 300;
        this.onLazyLoad = new core_1.EventEmitter();
        this.columnResizeMode = 'fit';
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.sortMode = 'single';
        this.sortOrder = 1;
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.emptyMessage = 'No records found';
        this.paginatorPosition = 'bottom';
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
        this.tabindex = 1;
        this.sortableRowGroup = true;
        this.first = 0;
        this.filters = {};
        this.onRowExpand = new core_1.EventEmitter();
        this.onRowCollapse = new core_1.EventEmitter();
        this.onRowGroupExpand = new core_1.EventEmitter();
        this.onRowGroupCollapse = new core_1.EventEmitter();
        this.page = 0;
        this.columnsChanged = false;
        this.dataChanged = false;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toString().toLowerCase();
                return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
            },
            equals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase() == filter.toString().toLowerCase();
            },
            in: function (value, filter) {
                if (filter === undefined || filter === null || filter.length === 0) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === value)
                        return true;
                }
                return false;
            }
        };
        this.differ = differs.find([]).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    };
    DataTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initColumns();
        this.columnsSubscription = this.cols.changes.subscribe(function (_) {
            _this.initColumns();
            _this.changeDetector.markForCheck();
        });
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'rowexpansion':
                    _this.rowExpansionTemplate = item.template;
                    break;
                case 'rowgroupheader':
                    _this.rowGroupHeaderTemplate = item.template;
                    break;
                case 'rowgroupfooter':
                    _this.rowGroupFooterTemplate = item.template;
                    break;
            }
        });
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }
            if (this.reorderableColumns) {
                this.initColumnReordering();
            }
            if (this.scrollable) {
                this.refreshScrolling();
            }
            this.columnsChanged = false;
        }
        if (this.dataChanged) {
            if (this.scrollable) {
                this.refreshScrolling();
            }
            this.dataChanged = false;
        }
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', function () {
                _this.filterTimeout = setTimeout(function () {
                    _this._filter();
                    _this.filterTimeout = null;
                }, _this.filterDelay);
            });
        }
        if (this.scrollable) {
            this.initScrolling();
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.value);
        if (changes) {
            this.dataChanged = true;
            if (this.paginator) {
                this.updatePaginator();
            }
            if (this.hasFilter()) {
                if (this.lazy) {
                    //prevent loop
                    if (this.stopFilterPropagation)
                        this.stopFilterPropagation = false;
                    else
                        this._filter();
                }
                else {
                    this._filter();
                }
            }
            if (this.stopSortPropagation) {
                this.stopSortPropagation = false;
            }
            else if (!this.lazy && (this.sortField || this.multiSortMeta)) {
                if (!this.sortColumn) {
                    this.sortColumn = this.columns.find(function (col) { return col.field === _this.sortField && col.sortable === 'custom'; });
                }
                if (this.sortMode == 'single')
                    this.sortSingle();
                else if (this.sortMode == 'multiple')
                    this.sortMultiple();
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
    };
    DataTable.prototype.initColumns = function () {
        this.columns = this.cols.toArray();
        this.columnsChanged = true;
    };
    DataTable.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    DataTable.prototype.updateRowGroupMetadata = function () {
        this.rowGroupMetadata = {};
        if (this.dataToRender) {
            for (var i = 0; i < this.dataToRender.length; i++) {
                var rowData = this.dataToRender[i];
                var group = this.resolveFieldData(rowData, this.sortField);
                if (i == 0) {
                    this.rowGroupMetadata[group] = { index: 0, size: 1 };
                }
                else {
                    var previousRowData = this.dataToRender[i - 1];
                    var previousRowGroup = this.resolveFieldData(previousRowData, this.sortField);
                    if (group === previousRowGroup) {
                        this.rowGroupMetadata[group].size++;
                    }
                    else {
                        this.rowGroupMetadata[group] = { index: i, size: 1 };
                    }
                }
            }
        }
    };
    DataTable.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataTable.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.stopFilterPropagation = true;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataTable.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
        if (this.rowGroupMode) {
            this.updateRowGroupMetadata();
        }
    };
    DataTable.prototype.onHeaderKeydown = function (event, column) {
        if (event.keyCode == 13) {
            this.sort(event, column);
            event.preventDefault();
        }
    };
    DataTable.prototype.onHeaderMousedown = function (event, header) {
        if (this.reorderableColumns) {
            if (event.target.nodeName !== 'INPUT') {
                header.draggable = true;
            }
            else if (event.target.nodeName === 'INPUT') {
                header.draggable = false;
            }
        }
    };
    DataTable.prototype.sort = function (event, column) {
        if (!column.sortable) {
            return;
        }
        var targetNode = event.target.nodeName;
        if (targetNode == 'TH' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            this.sortOrder = (this.sortField === column.field) ? this.sortOrder * -1 : 1;
            this.sortField = column.field;
            this.sortColumn = column;
            var metaKey = event.metaKey || event.ctrlKey;
            if (this.lazy) {
                this.stopFilterPropagation = true;
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if (this.sortMode == 'multiple') {
                    if (!this.multiSortMeta || !metaKey) {
                        this.multiSortMeta = [];
                    }
                    this.addSortMeta({ field: this.sortField, order: this.sortOrder });
                    this.sortMultiple();
                }
                else {
                    this.sortSingle();
                }
            }
            this.onSort.emit({
                field: this.sortField,
                order: this.sortOrder,
                multisortmeta: this.multiSortMeta
            });
        }
    };
    DataTable.prototype.sortSingle = function () {
        var _this = this;
        if (this.value) {
            if (this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                this.value.sort(function (data1, data2) {
                    var value1 = _this.resolveFieldData(data1, _this.sortField);
                    var value2 = _this.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
            }
            this.first = 0;
            if (this.hasFilter()) {
                this._filter();
            }
        }
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    };
    DataTable.prototype.sortMultiple = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
            });
            if (this.hasFilter()) {
                this._filter();
            }
        }
        //prevent resort at ngDoCheck
        this.stopSortPropagation = true;
    };
    DataTable.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    DataTable.prototype.addSortMeta = function (meta) {
        var index = -1;
        for (var i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    };
    DataTable.prototype.isSorted = function (column) {
        if (!column.sortable) {
            return false;
        }
        if (this.sortMode === 'single') {
            return (this.sortField && column.field === this.sortField);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    DataTable.prototype.getSortOrder = function (column) {
        var order = 0;
        if (this.sortMode === 'single') {
            if (this.sortField && column.field === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    };
    DataTable.prototype.onRowGroupClick = function (event) {
        if (this.rowGroupToggleClick) {
            this.rowGroupToggleClick = false;
            return;
        }
        if (this.sortableRowGroup) {
            var targetNode = event.target.nodeName;
            if ((targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c')))) {
                if (this.sortField != this.groupField) {
                    this.sortField = this.groupField;
                    this.sortSingle();
                }
                else {
                    this.sortOrder = -1 * this.sortOrder;
                    this.sortSingle();
                }
            }
        }
    };
    DataTable.prototype.handleRowClick = function (event, rowData) {
        if (this.rowTouch) {
            this.rowTouch = false;
            return false;
        }
        var targetNode = event.target.nodeName;
        if (targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            this.onRowClick.next({ originalEvent: event, data: rowData });
            if (!this.selectionMode) {
                return;
            }
            var metaKey = event.metaKey || event.ctrlKey;
            var selected = this.isSelected(rowData);
            if (selected && metaKey) {
                if (this.isSingleSelectionMode()) {
                    this.selection = null;
                    this.selectionChange.emit(null);
                }
                else {
                    this.selection.splice(this.findIndexInSelection(rowData), 1);
                    this.selectionChange.emit(this.selection);
                }
                this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
            }
            else {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    if (metaKey)
                        this.selection = this.selection || [];
                    else
                        this.selection = [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
                this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
            }
        }
    };
    DataTable.prototype.handleRowTap = function (event, rowData) {
        this.rowTouch = true;
        var targetNode = event.target.nodeName;
        if (targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-c'))) {
            this.onRowClick.next({ originalEvent: event, data: rowData });
            if (!this.selectionMode) {
                return;
            }
            if (this.isSelected(rowData)) {
                if (this.isSingleSelectionMode()) {
                    this.selection = null;
                    this.selectionChange.emit(null);
                }
                else {
                    this.selection.splice(this.findIndexInSelection(rowData), 1);
                    this.selectionChange.emit(this.selection);
                }
                this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
            }
            else {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = this.selection || [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
                this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
            }
        }
    };
    DataTable.prototype.selectRowWithRadio = function (event, rowData) {
        if (this.selection != rowData) {
            this.selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });
        }
    };
    DataTable.prototype.toggleRowWithCheckbox = function (event, rowData) {
        var selectionIndex = this.findIndexInSelection(rowData);
        this.selection = this.selection || [];
        if (selectionIndex != -1) {
            this.selection.splice(selectionIndex, 1);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
        }
        else {
            this.selection.push(rowData);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
        }
        this.selectionChange.emit(this.selection);
    };
    DataTable.prototype.toggleRowsWithCheckbox = function (event) {
        if (event.checked)
            this.selection = this.dataToRender.slice(0);
        else
            this.selection = [];
        this.selectionChange.emit(this.selection);
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: event.checked });
    };
    DataTable.prototype.onRowRightClick = function (event, rowData) {
        if (this.contextMenu) {
            var selectionIndex = this.findIndexInSelection(rowData);
            var selected = selectionIndex != -1;
            if (!selected) {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
            }
            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.rowDblclick = function (event, rowData) {
        this.onRowDblclick.emit({ originalEvent: event, data: rowData });
    };
    DataTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    DataTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    DataTable.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.domHandler.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isSelected = function (rowData) {
        return ((rowData && this.domHandler.equals(rowData, this.selection)) || this.findIndexInSelection(rowData) != -1);
    };
    Object.defineProperty(DataTable.prototype, "allSelected", {
        get: function () {
            var val = true;
            if (this.dataToRender && this.selection && (this.dataToRender.length <= this.selection.length)) {
                for (var _i = 0, _a = this.dataToRender; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (!this.isSelected(data)) {
                        val = false;
                        break;
                    }
                }
            }
            else {
                val = false;
            }
            return val;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.onFilterKeyup = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.filterTimeout = setTimeout(function () {
            _this.filter(value, field, matchMode);
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    DataTable.prototype.filter = function (value, field, matchMode) {
        if (!this.isFilterBlank(value))
            this.filters[field] = { value: value, matchMode: matchMode };
        else if (this.filters[field])
            delete this.filters[field];
        if (this.lazy) {
            this.stopFilterPropagation = true;
        }
        this._filter();
    };
    DataTable.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    DataTable.prototype._filter = function () {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];
            for (var i = 0; i < this.value.length; i++) {
                var localMatch = true;
                var globalMatch = false;
                for (var j = 0; j < this.columns.length; j++) {
                    var col = this.columns[j], filterMeta = this.filters[col.field];
                    //local
                    if (filterMeta) {
                        var filterValue = filterMeta.value, filterField = col.field, filterMatchMode = filterMeta.matchMode || 'startsWith', dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }
                        if (!localMatch) {
                            break;
                        }
                    }
                    //global
                    if (this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.field), this.globalFilter.value);
                    }
                }
                var matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }
                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onFilter.emit({
            filters: this.filters
        });
    };
    DataTable.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty || (this.globalFilter && this.globalFilter.value && this.globalFilter.value.trim().length);
    };
    DataTable.prototype.onFilterInputClick = function (event) {
        event.stopPropagation();
    };
    DataTable.prototype.switchCellToEditMode = function (element, column, rowData) {
        if (!this.selectionMode && this.editable && column.editable) {
            var cell = this.findCell(element);
            if (cell != this.editingCell) {
                this.editingCell = cell;
                this.onEditInit.emit({ column: column, data: rowData });
                if (!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                    this.domHandler.addClass(cell, 'ui-cell-editing');
                    this.domHandler.addClass(cell, 'ui-state-highlight');
                    var editor = cell.querySelector('.ui-cell-editor').focus();
                }
            }
        }
    };
    DataTable.prototype.switchCellToViewMode = function (element, column, rowData, complete) {
        if (this.editable) {
            if (this.preventBlurOnEdit) {
                this.preventBlurOnEdit = false;
            }
            else {
                if (complete)
                    this.onEditComplete.emit({ column: column, data: rowData });
                else
                    this.onEditCancel.emit({ column: column, data: rowData });
                var cell = this.findCell(element);
                this.domHandler.removeClass(cell, 'ui-cell-editing');
                this.domHandler.removeClass(cell, 'ui-state-highlight');
                this.editingCell = null;
            }
        }
    };
    DataTable.prototype.onCellEditorKeydown = function (event, column, rowData, colIndex) {
        if (this.editable) {
            this.onEdit.emit({ originalEvent: event, column: column, data: rowData });
            //enter
            if (event.keyCode == 13) {
                this.switchCellToViewMode(event.target, column, rowData, true);
                this.preventBlurOnEdit = true;
                event.preventDefault();
            }
            else if (event.keyCode == 27) {
                this.switchCellToViewMode(event.target, column, rowData, false);
                this.preventBlurOnEdit = true;
                event.preventDefault();
            }
            else if (event.keyCode == 9) {
                var currentCell = this.findCell(event.target);
                var row = currentCell.parentElement;
                var targetCell = void 0;
                if (event.shiftKey) {
                    if (colIndex == 0) {
                        var previousRow = row.previousElementSibling;
                        if (previousRow) {
                            targetCell = previousRow.lastElementChild;
                        }
                    }
                    else {
                        targetCell = row.children[colIndex - 1];
                    }
                }
                else {
                    if (colIndex == (row.children.length - 1)) {
                        var nextRow = row.nextElementSibling;
                        if (nextRow) {
                            targetCell = nextRow.firstElementChild;
                        }
                    }
                    else {
                        targetCell = row.children[colIndex + 1];
                    }
                }
                if (targetCell) {
                    this.renderer.invokeElementMethod(targetCell, 'click');
                    event.preventDefault();
                }
            }
        }
    };
    DataTable.prototype.findCell = function (element) {
        var cell = element;
        while (cell.tagName != 'TD') {
            cell = cell.parentElement;
        }
        return cell;
    };
    DataTable.prototype.initResizableColumns = function () {
        var _this = this;
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
        this.documentColumnResizeListener = this.renderer.listenGlobal('body', 'mousemove', function (event) {
            if (_this.columnResizing) {
                _this.onColumnResize(event);
            }
        });
        this.documentColumnResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', function (event) {
            if (_this.columnResizing) {
                _this.columnResizing = false;
                _this.onColumnResizeEnd(event);
            }
        });
    };
    DataTable.prototype.initColumnResize = function (event) {
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastPageX = event.pageX;
    };
    DataTable.prototype.onColumnResize = function (event) {
        var container = this.el.nativeElement.children[0];
        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight - 4 + 'px';
        this.resizerHelper.style.top = container.offsetTop + 'px';
        if (event.pageX > container.offsetLeft && event.pageX < (container.offsetLeft + container.offsetWidth)) {
            this.resizerHelper.style.left = event.pageX + 'px';
        }
        this.resizerHelper.style.display = 'block';
    };
    DataTable.prototype.onColumnResizeEnd = function (event) {
        var delta = this.resizerHelper.offsetLeft - this.lastPageX;
        var columnWidth = this.resizeColumn.offsetWidth;
        var newColumnWidth = columnWidth + delta;
        var minWidth = this.resizeColumn.style.minWidth || 15;
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = this.resizeColumn.nextElementSibling;
                var nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if (nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
                if (this.header) {
                    var headerEL = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-header');
                    headerEL.style.width = this.tbody.parentElement.style.width;
                }
                if (this.footer) {
                    var footerEL = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-footer');
                    footerEL.style.width = this.tbody.parentElement.style.width;
                }
            }
            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }
        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.domHandler.removeClass(this.el.nativeElement.children[0], 'ui-unselectable-text');
    };
    DataTable.prototype.fixColumnWidths = function () {
        var columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var col = columns_1[_i];
            col.style.width = col.offsetWidth + 'px';
        }
    };
    DataTable.prototype.onColumnDragStart = function (event) {
        if (this.columnResizing) {
            event.preventDefault();
            return;
        }
        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
    };
    DataTable.prototype.onColumnDragover = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            var dropHeader = this.findParentHeader(event.target);
            if (this.draggedColumn != dropHeader) {
                var targetPosition = dropHeader.getBoundingClientRect();
                var targetLeft = targetPosition.left + this.domHandler.getWindowScrollLeft();
                var targetTop = targetPosition.top + this.domHandler.getWindowScrollTop();
                var columnCenter = targetLeft + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUp.style.top = (targetTop - 16) + 'px';
                this.reorderIndicatorDown.style.top = targetTop + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - 8) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUp.style.left = (targetLeft - 8) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - 8) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUp.style.display = 'block';
                this.reorderIndicatorDown.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    DataTable.prototype.onColumnDragleave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
        }
    };
    DataTable.prototype.onColumnDrop = function (event) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = this.domHandler.index(this.draggedColumn);
            var dropIndex = this.domHandler.index(this.findParentHeader(event.target));
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop) {
                this.columns.splice(dropIndex, 0, this.columns.splice(dragIndex, 1)[0]);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    DataTable.prototype.initColumnReordering = function () {
        this.reorderIndicatorUp = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-up');
        this.reorderIndicatorDown = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-down');
    };
    DataTable.prototype.findParentHeader = function (element) {
        if (element.nodeName == 'TH') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'TH') {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
    };
    DataTable.prototype.initScrolling = function () {
        var _this = this;
        this.scrollHeader = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header');
        this.scrollHeaderBox = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-header-box');
        this.scrollBody = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-scrollable-body');
        this.percentageScrollHeight = this.scrollHeight && (this.scrollHeight.indexOf('%') !== -1);
        this.bodyScrollListener = this.renderer.listen(this.scrollBody, 'scroll', function () {
            _this.scrollHeaderBox.style.marginLeft = -1 * _this.scrollBody.scrollLeft + 'px';
        });
        this.headerScrollListener = this.renderer.listen(this.scrollHeader, 'scroll', function () {
            _this.scrollHeader.scrollLeft = 0;
        });
        if (this.percentageScrollHeight) {
            this.resizeScrollListener = this.renderer.listenGlobal('window', 'resize', function () {
                _this.scrollBody.style.maxHeight = _this.domHandler.getOuterHeight(_this.el.nativeElement.parentElement) * (parseInt(_this.scrollHeight) / 100) + 'px';
            });
        }
    };
    DataTable.prototype.refreshScrolling = function () {
        var tableHeader = this.domHandler.findSingle(this.el.nativeElement, '.ui-datatable-header');
        if (this.scrollHeight) {
            if (this.percentageScrollHeight) {
                var relativeHeight = this.domHandler.getOuterHeight(this.el.nativeElement.parentElement) * (parseInt(this.scrollHeight) / 100);
                var headerHeight = this.domHandler.getOuterHeight(this.scrollHeader);
                if (tableHeader) {
                    headerHeight += this.domHandler.getOuterHeight(tableHeader);
                }
                this.scrollBody.style.maxHeight = (relativeHeight - headerHeight) + 'px';
            }
            else {
                this.scrollBody.style.maxHeight = this.scrollHeight;
            }
            var marginRight = this.hasVerticalOverflow() ? this.calculateScrollbarWidth() : 0;
            this.scrollHeaderBox.style.marginRight = marginRight + 'px';
        }
    };
    DataTable.prototype.calculateScrollbarWidth = function () {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    DataTable.prototype.hasVerticalOverflow = function () {
        return this.scrollHeight && this.domHandler.getOuterHeight(this.scrollBody.children[0]) > this.domHandler.getOuterHeight(this.scrollBody);
    };
    DataTable.prototype.hasFooter = function () {
        if (this.footerColumnGroup) {
            return true;
        }
        else {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    DataTable.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            multiSortMeta: this.multiSortMeta
        };
    };
    DataTable.prototype.toggleRow = function (row, event) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }
        var expandedRowIndex = this.findExpandedRowIndex(row);
        if (expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit({
                originalEvent: event,
                data: row
            });
        }
        else {
            this.expandedRows.push(row);
            this.onRowExpand.emit({
                originalEvent: event,
                data: row
            });
        }
        if (event) {
            event.preventDefault();
        }
    };
    DataTable.prototype.findExpandedRowIndex = function (row) {
        var index = -1;
        if (this.expandedRows) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i] == row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowExpanded = function (row) {
        return this.findExpandedRowIndex(row) != -1;
    };
    DataTable.prototype.findExpandedRowGroupIndex = function (row) {
        var index = -1;
        if (this.expandedRowsGroups && this.expandedRowsGroups.length) {
            for (var i = 0; i < this.expandedRowsGroups.length; i++) {
                var group = this.expandedRowsGroups[i];
                var rowGroupField = this.resolveFieldData(row, this.groupField);
                if (rowGroupField === group) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowGroupExpanded = function (row) {
        return this.findExpandedRowGroupIndex(row) != -1;
    };
    DataTable.prototype.toggleRowGroup = function (event, row) {
        this.rowGroupToggleClick = true;
        var index = this.findExpandedRowGroupIndex(row);
        var rowGroupField = this.resolveFieldData(row, this.groupField);
        if (index >= 0) {
            this.expandedRowsGroups.splice(index, 1);
            this.onRowGroupCollapse.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        else {
            this.expandedRowsGroups = this.expandedRowsGroups || [],
                this.expandedRowsGroups.push(rowGroupField);
            this.onRowGroupExpand.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        event.preventDefault();
    };
    DataTable.prototype.reset = function () {
        this.sortField = null;
        this.sortOrder = 1;
        this.filteredValue = null;
        this.filters = {};
        if (this.paginator) {
            this.paginate({
                first: 0,
                rows: this.rows
            });
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.visibleColumns = function () {
        return this.columns ? this.columns.filter(function (c) { return !c.hidden; }) : [];
    };
    DataTable.prototype.exportCSV = function () {
        var _this = this;
        var data = this.value;
        var csv = '';
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field) {
                csv += this.columns[i].field;
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body        
        this.value.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                if (_this.columns[i_1].field) {
                    csv += _this.resolveFieldData(record, _this.columns[i_1].field);
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                document.body.appendChild(link);
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    DataTable.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataTable.prototype.getRowStyleClass = function (rowData, rowIndex) {
        var styleClass = 'ui-widget-content';
        if (this.rowStyleClass) {
            var rowClass = this.rowStyleClass.call(this, rowData, rowIndex);
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        }
        return styleClass;
    };
    DataTable.prototype.ngOnDestroy = function () {
        //remove event listener
        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }
        if (this.scrollable) {
            this.bodyScrollListener();
            this.headerScrollListener();
            if (this.percentageScrollHeight) {
                this.resizeScrollListener();
            }
        }
        if (this.resizableColumns && this.documentColumnResizeListener && this.documentColumnResizeEndListener) {
            this.documentColumnResizeListener();
            this.documentColumnResizeEndListener();
        }
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowDblclick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "tableStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "tableStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "globalFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "sortOrder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "groupField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "multiSortMeta", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "csvSeparator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "exportFilename", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "paginatorPosition", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onFilter", void 0);
    __decorate([
        core_1.ContentChild(shared_2.Header), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(shared_2.Footer), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "expandableRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "expandedRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "expandableRowGroups", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "expandedRowsGroups", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DataTable.prototype, "rowStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "rowGroupMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "sortableRowGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortFile", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "rowHover", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "first", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "filters", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowCollapse", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowGroupExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowGroupCollapse", void 0);
    __decorate([
        core_1.ContentChildren(shared_2.PrimeTemplate), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "templates", void 0);
    __decorate([
        core_1.ContentChildren(shared_2.Column), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "cols", void 0);
    __decorate([
        core_1.ContentChild(shared_2.HeaderColumnGroup), 
        __metadata('design:type', shared_2.HeaderColumnGroup)
    ], DataTable.prototype, "headerColumnGroup", void 0);
    __decorate([
        core_1.ContentChild(shared_2.FooterColumnGroup), 
        __metadata('design:type', shared_2.FooterColumnGroup)
    ], DataTable.prototype, "footerColumnGroup", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'p-dataTable',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" \n            [ngClass]=\"{'ui-datatable ui-widget':true,'ui-datatable-reflow':responsive,'ui-datatable-stacked':stacked,'ui-datatable-resizable':resizableColumns,'ui-datatable-scrollable':scrollable}\">\n            <div class=\"ui-datatable-header ui-widget-header\" *ngIf=\"header\" [ngStyle]=\"{'width': scrollWidth}\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\"\n                (onPageChange)=\"paginate($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='bottom' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datatable-tablewrapper\" *ngIf=\"!scrollable\">\n                <table [class]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <thead>\n                        <tr *ngIf=\"!headerColumnGroup\" class=\"ui-state-default\">\n                            <template ngFor let-col [ngForOf]=\"columns\" let-lastCol=\"last\">\n                                <th #headerCell [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                    [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-state-focus': headerCell === focusedHeader && col.sortable,\n                                    'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns,'ui-selection-column':col.selectionMode}\" \n                                    (dragstart)=\"onColumnDragStart($event)\" (dragover)=\"onColumnDragover($event)\" (dragleave)=\"onColumnDragleave($event)\" (drop)=\"onColumnDrop($event)\" (mousedown)=\"onHeaderMousedown($event,headerCell)\"\n                                    [attr.tabindex]=\"col.sortable ? tabindex : null\" (focus)=\"focusedHeader=$event.target\" (blur)=\"focusedHeader=null\" (keydown)=\"onHeaderKeydown($event,col)\">\n                                    <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\" (mousedown)=\"initColumnResize($event)\"></span>\n                                    <span class=\"ui-column-title\" *ngIf=\"!col.selectionMode&&!col.headerTemplate\">{{col.header}}</span>\n                                    <span class=\"ui-column-title\" *ngIf=\"col.headerTemplate\">\n                                        <p-columnHeaderTemplateLoader [column]=\"col\"></p-columnHeaderTemplateLoader>\n                                    </span>\n                                    <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                         [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                    <input type=\"text\" pInputText class=\"ui-column-filter\" [attr.placeholder]=\"col.filterPlaceholder\" *ngIf=\"col.filter&&!col.filterTemplate\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                    <p-columnFilterTemplateLoader [column]=\"col\" *ngIf=\"col.filterTemplate\"></p-columnFilterTemplateLoader>\n                                    <p-dtCheckbox *ngIf=\"col.selectionMode=='multiple'\" (onChange)=\"toggleRowsWithCheckbox($event)\" [checked]=\"allSelected\" [disabled]=\"isEmpty()\"></p-dtCheckbox>\n                                </th>\n                            </template>\n                        </tr>\n                        <template [ngIf]=\"headerColumnGroup\">\n                            <tr *ngFor=\"let headerRow of headerColumnGroup.rows\" class=\"ui-state-default\">\n                                <th #headerCell *ngFor=\"let col of headerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                                    (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,\n                                    'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns}\"\n                                    [tabindex]=\"col.sortable ? tabindex : -1\" (focus)=\"focusedHeader=$event.target\" (blur)=\"focusedHeader=null\" (keydown)=\"onHeaderKeydown($event,col)\">\n                                    <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\" (mousedown)=\"initColumnResize($event)\"></span>\n                                    <span class=\"ui-column-title\" *ngIf=\"!col.selectionMode&&!col.headerTemplate\">{{col.header}}</span>\n                                    <span class=\"ui-column-title\" *ngIf=\"col.headerTemplate\">\n                                        <p-columnHeaderTemplateLoader [column]=\"col\"></p-columnHeaderTemplateLoader>\n                                    </span>\n                                    <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                         [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                    <input type=\"text\" pInputText class=\"ui-column-filter\" [attr.placeholder]=\"col.filterPlaceholder\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                </th>\n                            </tr>\n                        </template>\n                    </thead>\n                    <tfoot *ngIf=\"hasFooter()\">\n                        <tr *ngIf=\"!footerColumnGroup\">\n                            <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [ngClass]=\"{'ui-state-default':true}\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\">\n                                <span class=\"ui-column-footer\" *ngIf=\"!col.footerTemplate\">{{col.footer}}</span>\n                                <span class=\"ui-column-footer\" *ngIf=\"col.footerTemplate\">\n                                    <p-columnFooterTemplateLoader [column]=\"col\"></p-columnFooterTemplateLoader>\n                                </span>\n                            </th>\n                        </tr>\n                        <template [ngIf]=\"footerColumnGroup\">\n                            <tr *ngFor=\"let footerRow of footerColumnGroup.rows\">\n                                <th *ngFor=\"let col of footerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\"\n                                    [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    [ngClass]=\"{'ui-state-default':true}\">\n                                    <span class=\"ui-column-footer\" *ngIf=\"!col.footerTemplate\">{{col.footer}}</span>\n                                    <span class=\"ui-column-footer\" *ngIf=\"col.footerTemplate\">\n                                        <p-columnFooterTemplateLoader [column]=\"col\"></p-columnFooterTemplateLoader>\n                                    </span>\n                                </th>\n                            </tr>\n                        </template>\n                    </tfoot>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                            <tr #rowGroupElement class=\"ui-widget-header ui-rowgroup-header\" *ngIf=\"rowGroupMode=='subheader' && (rowIndex === 0||(resolveFieldData(rowData,groupField) !== resolveFieldData(dataToRender[rowIndex - 1],groupField)))\"\n                                (click)=\"onRowGroupClick($event)\" [ngStyle]=\"{'cursor': sortableRowGroup ? 'pointer' : 'auto'}\">\n                                <td [attr.colspan]=\"columns.length\">\n                                    <a href=\"#\" *ngIf=\"expandableRowGroups\" (click)=\"toggleRowGroup($event,rowData)\">\n                                        <span class=\"fa fa-fw\" [ngClass]=\"{'fa-chevron-circle-down':isRowGroupExpanded(rowData), 'fa-chevron-circle-right': !isRowGroupExpanded(rowData)}\"></span>\n                                    </a>\n                                    <p-templateLoader [template]=\"rowGroupHeaderTemplate\" [data]=\"rowData\"></p-templateLoader>\n                                </td>\n                            </tr>\n                            <tr #rowElement *ngIf=\"!expandableRowGroups||isRowGroupExpanded(rowData)\" [class]=\"getRowStyleClass(rowData,rowIndex)\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                    (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\" (touchstart)=\"handleRowTap($event, rowData)\"\n                                    [ngClass]=\"{'ui-datatable-even':even&&rowGroupMode!='rowspan','ui-datatable-odd':odd&&rowGroupMode!='rowspan','ui-state-hover': ((rowHover || selectionMode) && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                                <template ngFor let-col [ngForOf]=\"columns\" let-colIndex=\"index\">\n                                    <td *ngIf=\"!rowGroupMode || (rowGroupMode == 'subheader') ||\n                                        (rowGroupMode=='rowspan' && ((sortField==col.field && rowGroupMetadata[resolveFieldData(rowData,sortField)].index == rowIndex) || (sortField!=col.field)))\"\n                                        [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                        [ngClass]=\"{'ui-editable-column':col.editable,'ui-selection-column':col.selectionMode}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\"\n                                        [attr.rowspan]=\"(rowGroupMode=='rowspan' && sortField == col.field && rowGroupMetadata[resolveFieldData(rowData,sortField)].index == rowIndex) ? rowGroupMetadata[resolveFieldData(rowData,sortField)].size : null\">\n                                        <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                        <span class=\"ui-cell-data\" *ngIf=\"!col.bodyTemplate && !col.expander && !col.selectionMode\">{{resolveFieldData(rowData,col.field)}}</span>\n                                        <span class=\"ui-cell-data\" *ngIf=\"col.bodyTemplate\">\n                                            <p-columnBodyTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnBodyTemplateLoader>\n                                        </span>\n                                        <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                                (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData, colIndex)\"/>\n                                        <a href=\"#\" *ngIf=\"col.expander\" (click)=\"toggleRow(rowData,$event)\">\n                                            <span class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"></span>\n                                        </a>\n                                        <p-dtRadioButton *ngIf=\"col.selectionMode=='single'\" (onClick)=\"selectRowWithRadio($event, rowData)\" [checked]=\"isSelected(rowData)\"></p-dtRadioButton>\n                                        <p-dtCheckbox *ngIf=\"col.selectionMode=='multiple'\" (onChange)=\"toggleRowWithCheckbox($event,rowData)\" [checked]=\"isSelected(rowData)\"></p-dtCheckbox>\n                                    </td>\n                                </template>\n                            </tr>\n                            <tr class=\"ui-widget-header\" *ngIf=\"rowGroupFooterTemplate && rowGroupMode=='subheader' && ((rowIndex === dataToRender.length - 1)||(resolveFieldData(rowData,groupField) !== resolveFieldData(dataToRender[rowIndex + 1],groupField))) && (!expandableRowGroups || isRowGroupExpanded(rowData))\">\n                                <p-templateLoader class=\"ui-helper-hidden\" [data]=\"rowData\" [template]=\"rowGroupFooterTemplate\"></p-templateLoader>\n                            </tr>\n                            <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                                <td [attr.colspan]=\"visibleColumns().length\">\n                                    <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                                </td>\n                            </tr>\n                        </template>\n                        \n                        <tr *ngIf=\"isEmpty()\" class=\"ui-widget-content\">\n                            <td [attr.colspan]=\"visibleColumns().length\" class=\"ui-datatable-emptymessage\">{{emptyMessage}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\"></div>\n                <span class=\"fa fa-arrow-down ui-datatable-reorder-indicator-up\" style=\"position: absolute; display: none;\"></span>\n                <span class=\"fa fa-arrow-up ui-datatable-reorder-indicator-down\" style=\"position: absolute; display: none;\"></span>\n            </div>\n            <div class=\"ui-widget-header ui-datatable-scrollable-header\" *ngIf=\"scrollable\" [ngStyle]=\"{'width': scrollWidth}\">\n                <div class=\"ui-datatable-scrollable-header-box\">\n                    <table [class]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                        <thead>\n                            <tr>\n                                <template ngFor let-col [ngForOf]=\"columns\" let-lastCol=\"last\">\n                                    <th #headerCell [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                        (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                        [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,\n                                        'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col), 'ui-resizable-column': resizableColumns,'ui-selection-column':col.selectionMode}\"\n                                        [tabindex]=\"col.sortable ? tabindex : -1\" (focus)=\"focusedHeader=$event.target\" (blur)=\"focusedHeader=null\" (keydown)=\"onHeaderKeydown($event,col)\">\n                                        <span class=\"ui-column-resizer\" *ngIf=\"resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')\"></span>\n                                        <span class=\"ui-column-title\" *ngIf=\"!col.selectionMode&&!col.headerTemplate\">{{col.header}}</span>\n                                        <span class=\"ui-column-title\" *ngIf=\"col.headerTemplate\">\n                                            <p-columnHeaderTemplateLoader [column]=\"col\"></p-columnHeaderTemplateLoader>\n                                        </span>\n                                        <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                             [ngClass]=\"{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}\"></span>\n                                        <input type=\"text\" pInputText class=\"ui-column-filter\" [attr.placeholder]=\"col.filterPlaceholder\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                        <p-dtCheckbox *ngIf=\"col.selectionMode=='multiple'\" (onChange)=\"toggleRowsWithCheckbox($event)\" [checked]=\"allSelected\" [disabled]=\"isEmpty()\"></p-dtCheckbox>\n                                    </th>\n                                </template>\n                            </tr>\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <div class=\"ui-datatable-scrollable-body\" *ngIf=\"scrollable\" [ngStyle]=\"{'width': scrollWidth}\">\n                <table [class]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                            <tr #rowGroupElement class=\"ui-widget-header ui-rowgroup-header\" *ngIf=\"rowGroupMode=='subheader' && (rowIndex === 0||(resolveFieldData(rowData,groupField) !== resolveFieldData(dataToRender[rowIndex -1],groupField)))\"\n                                (click)=\"onRowGroupClick($event)\" [ngStyle]=\"{'cursor': sortableRowGroup ? 'pointer' : 'auto'}\">\n                                <td [attr.colspan]=\"columns.length\"><p-templateLoader [template]=\"rowGroupHeaderTemplate\" [data]=\"rowData\"></p-templateLoader></td>\n                            </tr>\n                            <tr #rowElement class=\"ui-widget-content\" [class]=\"getRowStyleClass(rowData,rowIndex)\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                    (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\"\n                                    [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': ((rowHover || selectionMode) && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                                <template ngFor let-col [ngForOf]=\"columns\" let-colIndex=\"index\">\n                                <td *ngIf=\"!rowGroupMode || (rowGroupMode == 'subheader') ||\n                                    (rowGroupMode=='rowspan' && ((sortField==col.field && rowGroupMetadata[resolveFieldData(rowData,sortField)].index == rowIndex) || (sortField!=col.field)))\"\n                                    [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    [ngClass]=\"{'ui-editable-column':col.editable,'ui-selection-column':col.selectionMode}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\"\n                                    [attr.rowspan]=\"(rowGroupMode=='rowspan' && sortField == col.field && rowGroupMetadata[resolveFieldData(rowData,sortField)].index == rowIndex) ? rowGroupMetadata[resolveFieldData(rowData,sortField)].size : null\">\n                                    <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"!col.bodyTemplate && !col.expander && !col.selectionMode\">{{resolveFieldData(rowData,col.field)}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"col.bodyTemplate\">\n                                        <p-columnBodyTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnBodyTemplateLoader>\n                                    </span>\n                                    <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                            (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData, colIndex)\"/>\n                                    <a href=\"#\" *ngIf=\"col.expander\" (click)=\"toggleRow(rowData,$event)\">\n                                        <span class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"></span>\n                                    </a>\n                                    <p-dtRadioButton *ngIf=\"col.selectionMode=='single'\" (onClick)=\"selectRowWithRadio($event, rowData)\" [checked]=\"isSelected(rowData)\"></p-dtRadioButton>\n                                    <p-dtCheckbox *ngIf=\"col.selectionMode=='multiple'\" (onChange)=\"toggleRowWithCheckbox($event,rowData)\" [checked]=\"isSelected(rowData)\"></p-dtCheckbox>\n                                </td>\n                                </template>\n                            </tr>\n                            <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                                <td [attr.colspan]=\"visibleColumns().length\">\n                                    <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                                </td>\n                            </tr>\n                        </template>\n                        \n                        <tr *ngIf=\"isEmpty()\" class=\"ui-widget-content\">\n                            <td [attr.colspan]=\"visibleColumns().length\" class=\"ui-datatable-emptymessage\">{{emptyMessage}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\"\n                (onPageChange)=\"paginate($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='top' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datatable-footer ui-widget-header\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.Renderer, core_1.ChangeDetectorRef])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
var DataTableModule = (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule, paginator_1.PaginatorModule, forms_1.FormsModule, inputtext_1.InputTextModule],
            exports: [DataTable, shared_1.SharedModule],
            declarations: [DataTable, DTRadioButton, DTCheckbox, RowExpansionLoader]
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableModule);
    return DataTableModule;
}());
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=datatable.js.map