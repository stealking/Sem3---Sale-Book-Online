"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var CREDIT_CARD_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return CreditCardValidator; }),
    multi: true
};
var CreditCardValidator = (function () {
    function CreditCardValidator() {
    }
    CreditCardValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.creditCard(c);
    };
    CreditCardValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[creditCard][formControlName],[creditCard][formControl],[creditCard][ngModel]',
                    providers: [CREDIT_CARD_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    CreditCardValidator.ctorParameters = [];
    return CreditCardValidator;
}());
exports.CreditCardValidator = CreditCardValidator;
//# sourceMappingURL=credit-card.js.map