import { Component, VERSION } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validationMessage } from "./error-aware-form-field/form-validation";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    age: new FormControl("", semanticAgeValidator)
  });
}

const semanticAgeValidator = Validators.compose([
  Validators.required,
  validationMessage(
    Validators.min(18),
    "You have to be 18 years old to register!"
  )
]);
