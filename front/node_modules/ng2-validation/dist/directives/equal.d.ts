import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare class EqualValidator implements Validator, OnInit, OnChanges {
    equal: any;
    private validator;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
