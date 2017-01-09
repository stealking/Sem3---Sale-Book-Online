"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var MAX_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MaxValidator; }),
    multi: true
};
var MaxValidator = (function () {
    function MaxValidator() {
    }
    MaxValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.max(this.max);
    };
    MaxValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'max') {
                this.validator = index_1.CustomValidators.max(changes[key].currentValue);
            }
        }
    };
    MaxValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    MaxValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                    providers: [MAX_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MaxValidator.ctorParameters = [];
    MaxValidator.propDecorators = {
        'max': [{ type: core_1.Input },],
    };
    return MaxValidator;
}());
exports.MaxValidator = MaxValidator;
//# sourceMappingURL=max.js.map