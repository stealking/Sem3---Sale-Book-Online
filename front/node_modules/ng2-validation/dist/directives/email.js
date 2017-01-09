"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var EMAIL_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return EmailValidator; }),
    multi: true
};
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.email(c);
    };
    EmailValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[email][formControlName],[email][formControl],[email][ngModel]',
                    providers: [EMAIL_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    EmailValidator.ctorParameters = [];
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email.js.map