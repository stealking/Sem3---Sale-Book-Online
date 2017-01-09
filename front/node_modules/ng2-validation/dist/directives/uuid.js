"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var UUID_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return UUIDValidator; }),
    multi: true
};
var UUIDValidator = (function () {
    function UUIDValidator() {
    }
    UUIDValidator.prototype.ngOnInit = function () {
        this.validator = index_1.CustomValidators.uuid(this.uuid);
    };
    UUIDValidator.prototype.ngOnChanges = function (changes) {
        for (var key in changes) {
            if (key === 'uuid') {
                this.validator = index_1.CustomValidators.uuid(changes[key].currentValue);
            }
        }
    };
    UUIDValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    UUIDValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[uuid][formControlName],[uuid][formControl],[uuid][ngModel]',
                    providers: [UUID_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    UUIDValidator.ctorParameters = [];
    UUIDValidator.propDecorators = {
        'uuid': [{ type: core_1.Input },],
    };
    return UUIDValidator;
}());
exports.UUIDValidator = UUIDValidator;
//# sourceMappingURL=uuid.js.map