"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var PHONE_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return PhoneValidator; }),
    multi: true
};
var PhoneValidator = (function () {
    function PhoneValidator() {
    }
    PhoneValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.phone(this.phone);
    };
    PhoneValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'phone') {
                this.validator = index_1.CustomValidators.phone(changes[key].currentValue);
            }
        }
    };
    PhoneValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    PhoneValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[phone][formControlName],[phone][formControl],[phone][ngModel]',
                    providers: [PHONE_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    PhoneValidator.ctorParameters = [];
    PhoneValidator.propDecorators = {
        'phone': [{ type: core_1.Input },],
    };
    return PhoneValidator;
}());
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=phone.js.map