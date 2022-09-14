import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { from, isObservable, Observable } from "rxjs";
import { map } from "rxjs/operators";

export type MessageAwareValidationError = {
  original: unknown;
  messageCode: string;
};

export function isMessageAwareValidationError(
  obj: unknown | null | undefined
): obj is MessageAwareValidationError {
  return typeof obj === "object" && !!obj && "messageCode" in obj;
}

export type MessageAwareValidationErrors = {
  [K: string]: MessageAwareValidationError;
};

export type MessageAwareValidatorFn = (
  control: AbstractControl
) => MessageAwareValidationErrors | null;

export type AsyncMessageAwareValidatorFn = (
  control: AbstractControl
) =>
  | Promise<MessageAwareValidationErrors | null>
  | Observable<MessageAwareValidationErrors | null>;

export function validationMessage(
  validatorFn: ValidatorFn,
  message: string
): MessageAwareValidatorFn;
export function validationMessage(
  validatorFn: AsyncValidatorFn,
  message: string
): AsyncMessageAwareValidatorFn;

export function validationMessage(
  validatorFn: ValidatorFn | AsyncValidatorFn,
  message: string
): any {
  return (control: AbstractControl) => {
    const validationResult = validatorFn(control);

    if (isPromise(validationResult) || isObservable(validationResult)) {
      return from(validationResult).pipe(map(v => toMessageAware(v, message)));
    } else {
      return toMessageAware(validationResult, message);
    }
  };
}

function toMessageAware(
  validationErrors: ValidationErrors | null,
  message: string
) {
  if (!validationErrors) return null;

  const result = {} as MessageAwareValidationErrors;
  for (const key of Object.keys(validationErrors)) {
    result[key] = {
      original: validationErrors[key],
      messageCode: message
    };
  }
  return result;
}

function isPromise<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj.then === "function";
}
