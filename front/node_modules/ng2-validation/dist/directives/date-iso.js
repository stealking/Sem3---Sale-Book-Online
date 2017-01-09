"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var DATE_ISO_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return DateISOValidator; }),
    multi: true
};
var DateISOValidator = (function () {
    function DateISOValidator() {
    }
    DateISOValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.dateISO(c);
    };
    DateISOValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dateISO][formControlName],[dateISO][formControl],[dateISO][ngModel]',
                    providers: [DATE_ISO_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    DateISOValidator.ctorParameters = [];
    return DateISOValidator;
}());
exports.DateISOValidator = DateISOValidator;
//# sourceMappingURL=date-iso.js.map