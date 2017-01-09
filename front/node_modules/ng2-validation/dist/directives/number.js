"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var NUMBER_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return NumberValidator; }),
    multi: true
};
var NumberValidator = (function () {
    function NumberValidator() {
    }
    NumberValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.number(c);
    };
    NumberValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[number][formControlName],[number][formControl],[number][ngModel]',
                    providers: [NUMBER_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    NumberValidator.ctorParameters = [];
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=number.js.map