"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var RANGE_LENGTH_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return RangeLengthValidator; }),
    multi: true
};
var RangeLengthValidator = (function () {
    function RangeLengthValidator() {
    }
    RangeLengthValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.rangeLength(this.rangeLength);
    };
    RangeLengthValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'rangeLength') {
                this.validator = index_1.CustomValidators.rangeLength(changes[key].currentValue);
            }
        }
    };
    RangeLengthValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    RangeLengthValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[rangeLength][formControlName],[rangeLength][formControl],[rangeLength][ngModel]',
                    providers: [RANGE_LENGTH_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    RangeLengthValidator.ctorParameters = [];
    RangeLengthValidator.propDecorators = {
        'rangeLength': [{ type: core_1.Input },],
    };
    return RangeLengthValidator;
}());
exports.RangeLengthValidator = RangeLengthValidator;
//# sourceMappingURL=range-length.js.map