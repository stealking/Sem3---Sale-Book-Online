"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
var URL_VALIDATOR = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return UrlValidator; }),
    multi: true
};
var UrlValidator = (function () {
    function UrlValidator() {
    }
    UrlValidator.prototype.validate = function (c) {
        return index_1.CustomValidators.url(c);
    };
    UrlValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[url][formControlName],[url][formControl],[url][ngModel]',
                    providers: [URL_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    UrlValidator.ctorParameters = [];
    return UrlValidator;
}());
exports.UrlValidator = UrlValidator;
//# sourceMappingURL=url.js.map