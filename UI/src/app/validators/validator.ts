import { FormControl, ValidationErrors } from "@angular/forms";

export class Validator {

    static checkWhiteSpace(control: FormControl): ValidationErrors {
        if (control.value != null && control.value.trim().length === 0)   {
            return {'emptyWhiteSpace': true};
        }
        return {};
    }
}
