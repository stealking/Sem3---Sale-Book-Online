"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var MAX_DATE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MaxDateValidator; }),
    multi: true
};
var MaxDateValidator = (function () {
    function MaxDateValidator() {
    }
    MaxDateValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.maxDate(this.maxDate);
    };
    MaxDateValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'maxDate') {
                this.validator = index_1.CustomValidators.maxDate(changes[key].currentValue);
            }
        }
    };
    MaxDateValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    MaxDateValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[maxDate][formControlName],[maxDate][formControl],[maxDate][ngModel]',
                    providers: [MAX_DATE_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MaxDateValidator.ctorParameters = [];
    MaxDateValidator.propDecorators = {
        'maxDate': [{ type: core_1.Input },],
    };
    return MaxDateValidator;
}());
exports.MaxDateValidator = MaxDateValidator;
//# sourceMappingURL=max-date.js.map