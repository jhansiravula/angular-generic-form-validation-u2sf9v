import { Component, ContentChild, OnInit } from "@angular/core";
import { FormControlDirective, FormControlName } from "@angular/forms";
import { isMessageAwareValidationError } from "./form-validation";

@Component({
  selector: "app-error-aware-form-field",
  template: `
    <div>
      <ng-content></ng-content>
      <!-- If you use transloco use {{ error.messageCode | transloco: error.original }} -->
      <p *ngFor="let error of errors()">{{ error.messageCode }}</p>
    </div>
  `
})
export class ErrorAwareFormFieldComponent implements OnInit {
  /**
   * As far as I know this is not safe for controls but
   * this is just a showcase impl.
   */
  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {}

  errors() {
    if (this.control) {
      const errors = this.control.errors;

      if (errors) {
        return Object.keys(errors).map(errorKey => {
          const error = errors[errorKey];

          if (isMessageAwareValidationError(error)) {
            return error;
          } else {
            return {
              original: error,
              messageCode: `app.form.validation.default.${errorKey}`
            };
          }
        });
      } else return [];
    } else return [];
  }
}
