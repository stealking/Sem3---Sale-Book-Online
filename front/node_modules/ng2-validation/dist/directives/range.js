"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var RANGE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return RangeValidator; }),
    multi: true
};
var RangeValidator = (function () {
    function RangeValidator() {
    }
    RangeValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.range(this.range);
    };
    RangeValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'range') {
                this.validator = index_1.CustomValidators.range(changes[key].currentValue);
            }
        }
    };
    RangeValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    RangeValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[range][formControlName],[range][formControl],[range][ngModel]',
                    providers: [RANGE_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    RangeValidator.ctorParameters = [];
    RangeValidator.propDecorators = {
        'range': [{ type: core_1.Input },],
    };
    return RangeValidator;
}());
exports.RangeValidator = RangeValidator;
//# sourceMappingURL=range.js.map