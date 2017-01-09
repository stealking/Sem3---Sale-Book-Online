"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var DATE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return DateValidator; }),
    multi: true
};
var DateValidator = (function () {
    function DateValidator() {
    }
    DateValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.date(c);
    };
    DateValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[date][formControlName],[date][formControl],[date][ngModel]',
                    providers: [DATE_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    DateValidator.ctorParameters = [];
    return DateValidator;
}());
exports.DateValidator = DateValidator;
//# sourceMappingURL=date.js.map