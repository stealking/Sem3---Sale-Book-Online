"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var DIGITS_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return DigitsValidator; }),
    multi: true
};
var DigitsValidator = (function () {
    function DigitsValidator() {
    }
    DigitsValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.digits(c);
    };
    DigitsValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[digits][formControlName],[digits][formControl],[digits][ngModel]',
                    providers: [DIGITS_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    DigitsValidator.ctorParameters = [];
    return DigitsValidator;
}());
exports.DigitsValidator = DigitsValidator;
//# sourceMappingURL=digits.js.map