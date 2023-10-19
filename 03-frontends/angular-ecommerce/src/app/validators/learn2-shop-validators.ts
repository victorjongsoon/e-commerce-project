import { FormControl, ValidationErrors } from "@angular/forms";

export class Learn2ShopValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors | null {

        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)){
            // invalid, return error object
            // html template will check for this error key to determine whether to display message or not
            return { 'notOnlyWhitespace' : true };
        } else {
            // valid, return null
            return null;
        }

    }
}
