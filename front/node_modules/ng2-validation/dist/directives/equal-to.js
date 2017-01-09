"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var EQUAL_TO_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return EqualToValidator; }),
    multi: true
};
var EqualToValidator = (function () {
    function EqualToValidator() {
    }
    EqualToValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.equalTo(this.equalTo);
    };
    EqualToValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    EqualToValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
                    providers: [EQUAL_TO_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    EqualToValidator.ctorParameters = [];
    EqualToValidator.propDecorators = {
        'equalTo': [{ type: core_1.Input },],
    };
    return EqualToValidator;
}());
exports.EqualToValidator = EqualToValidator;
//# sourceMappingURL=equal-to.js.map