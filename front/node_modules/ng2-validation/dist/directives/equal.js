"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var EQUAL_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return EqualValidator; }),
    multi: true
};
var EqualValidator = (function () {
    function EqualValidator() {
    }
    EqualValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.equal(this.equal);
    };
    EqualValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'equal') {
                this.validator = index_1.CustomValidators.equal(changes[key].currentValue);
            }
        }
    };
    EqualValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    EqualValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
                    providers: [EQUAL_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    EqualValidator.ctorParameters = [];
    EqualValidator.propDecorators = {
        'equal': [{ type: core_1.Input },],
    };
    return EqualValidator;
}());
exports.EqualValidator = EqualValidator;
//# sourceMappingURL=equal.js.map