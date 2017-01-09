"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var MIN_DATE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MinDateValidator; }),
    multi: true
};
var MinDateValidator = (function () {
    function MinDateValidator() {
    }
    MinDateValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.minDate(this.minDate);
    };
    MinDateValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'minDate') {
                this.validator = index_1.CustomValidators.minDate(changes[key].currentValue);
            }
        }
    };
    MinDateValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    MinDateValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[minDate][formControlName],[minDate][formControl],[minDate][ngModel]',
                    providers: [MIN_DATE_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MinDateValidator.ctorParameters = [];
    MinDateValidator.propDecorators = {
        'minDate': [{ type: core_1.Input },],
    };
    return MinDateValidator;
}());
exports.MinDateValidator = MinDateValidator;
//# sourceMappingURL=min-date.js.map