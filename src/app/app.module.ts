import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ErrorAwareFormFieldComponent } from "./error-aware-form-field/error-aware-form-field.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, ErrorAwareFormFieldComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
