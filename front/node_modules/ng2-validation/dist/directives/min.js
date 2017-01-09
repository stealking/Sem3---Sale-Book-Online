"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var MIN_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MinValidator; }),
    multi: true
};
var MinValidator = (function () {
    function MinValidator() {
    }
    MinValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.min(this.min);
    };
    MinValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'min') {
                this.validator = index_1.CustomValidators.min(changes[key].currentValue);
            }
        }
    };
    MinValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    MinValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                    providers: [MIN_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MinValidator.ctorParameters = [];
    MinValidator.propDecorators = {
        'min': [{ type: core_1.Input },],
    };
    return MinValidator;
}());
exports.MinValidator = MinValidator;
//# sourceMappingURL=min.js.map