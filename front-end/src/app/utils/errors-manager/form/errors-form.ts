import { Validators } from "@angular/forms";

export type keyForms = 'pseudo' | 'email' | 'password' | 'passwordConfirm';

// Validators
const pseudoPattern: RegExp = /[A-Za-z]\d*/gm;
export const pseudoValidators = [
  Validators.required,
  Validators.pattern(pseudoPattern),
  Validators.minLength(3),
];

export const emailValidators = [
  Validators.required,
  Validators.email
];

const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
export const passwordValidators = [
  Validators.required,
  Validators.pattern(passwordPattern)
];
